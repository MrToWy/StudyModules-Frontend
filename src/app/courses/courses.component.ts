import {Component} from '@angular/core';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CloneCourseDto, CourseDto, CourseService} from "../../shared/course/course.service";
import {DepartmentService} from "../../shared/department/department.service";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {StepperModule} from "primeng/stepper";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../shared/auth/auth.service";
import {JobService} from "../../shared/job/job.service";
import {LanguageDto, LanguageService} from "../../shared/language/language.service";
import {CheckboxModule} from "primeng/checkbox";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    ToastModule,
    TableModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    InputTextModule,
    PaginatorModule,
    StepperModule,
    RouterLink,
    NgIf,
    CheckboxModule,
    NgForOf
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.sass',
  providers: [
    CourseService,
    DepartmentService,
    MessageService,
    AuthService,
    LanguageService,
    JobService
  ]
})
export class CoursesComponent {
  courses!: CourseDto[];
  languages: LanguageDto[] = [];
  selectedLanguageIds: number[] = [];

  deleteDialogVisible = false;
  cloneDialogVisible = false;
  cloning = false;
  refreshPdfDialogVisible = false;
  refreshingPdf = false;
  resultDownloaded = false;

  selectedCourse: CourseDto | undefined;
  cloneCourseDto: CloneCourseDto = {
    name: undefined,
    abbreviation: undefined,
    pruefungsordnung: undefined
  }

  constructor(private departmentService: DepartmentService,
              private courseService: CourseService,
              private jobService: JobService,
              private languageService: LanguageService,
              private router: Router,
              private route: ActivatedRoute,
              protected authService: AuthService,
              private messageService: MessageService) {
  }

  ngOnInit() {

    const url = this.router.url;
    const segments = url.split("/");

    const getIdFromSegment = (segment: string) => {
      const segmentIndex = segments.indexOf(segment);
      return segmentIndex !== -1 ? segments[segmentIndex + 1] : undefined;
    };


    const departmentId = Number(getIdFromSegment("department"));

    this.departmentService.get(departmentId).subscribe(department => {
      this.courses = department.degreePrograms;
    });

    this.languageService.getLanguages().subscribe(languages => {
      this.languages = languages;
      this.selectedLanguageIds = languages.map(language => language.id);
    });
  }

  async selectCourse(course: CourseDto) {
    await this.router.navigate(['course', course.id], {relativeTo: this.route});
  }

  cloneCourse(course: CourseDto, $event: MouseEvent) {
    $event.stopPropagation();

    this.selectedCourse = course;
    this.cloneCourseDto = {
      name: course.translations[0].name,
      abbreviation: course.abbreviation,
      pruefungsordnung: course.translations[0].pruefungsordnung
    }
    console.log(course);

    this.cloneDialogVisible = true;
  }

  deleteCourse(course: CourseDto, $event: MouseEvent) {
    $event.stopPropagation();

    this.selectedCourse = course;
    this.deleteDialogVisible = true;
  }

  async onCourseDeleted() {
    if (!this.selectedCourse) return;

    this.courseService.delete(this.selectedCourse.id).subscribe(() => {
      this.courses = this.courses.filter(course => course.id !== this.selectedCourse!.id);
      this.deleteDialogVisible = false;
    });
  }

  async onCourseCloned() {
    if (!this.selectedCourse) return;
    this.cloning = true;

    this.courseService.cloneCourse(this.selectedCourse.id, this.cloneCourseDto).subscribe((newCourseId: number) => {
      this.courseService.get(newCourseId).subscribe(
        course => {
          this.courses.push(course);
          this.cloneDialogVisible = false;
          this.cloning = false;
        }
      );
    });
  }

  downloadPdf(course: CourseDto, $event: MouseEvent) {
    $event.stopPropagation();

    this.languageService.getLanguageByCode(this.languageService.languageCode).subscribe(language => {
        window.open(this.courseService.downloadPdfUrl(course.id, language[0].id), '_blank');
    });
  }

  refreshPdf(course: CourseDto, $event: MouseEvent) {
    $event.stopPropagation();
    this.selectedCourse = course;
    this.refreshPdfDialogVisible = true;
  }

  startPdfGeneration(nextCallback: any) {
    nextCallback.emit();

    this.refreshingPdf = true;
    let finished = 0;

    this.selectedLanguageIds.forEach(languageId => {
      this.jobService.createNew(languageId, this.selectedCourse?.id!).subscribe((result) => {
        finished++;
        console.log(result)
        if (finished === this.selectedLanguageIds.length) {
          this.refreshingPdf = false;
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'PDF generation started'});
        }
      });
    });
  }

  downloadPdfResult() {
    this.resultDownloaded = true;
  }

  confirmPdfPublish() {
    this.refreshPdfDialogVisible = false;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'PDF successfully published'});
  }

  cancelPdfPublish() {
    this.refreshPdfDialogVisible = false;
  }
}
