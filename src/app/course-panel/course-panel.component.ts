import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {MenuModule} from "primeng/menu";
import {PanelModule} from "primeng/panel";
import {MenuItem, MessageService, SharedModule} from "primeng/api";
import {CloneCourseDto, CourseDto, CourseService} from "../../shared/course/course.service";
import {CheckboxModule} from "primeng/checkbox";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {JobsComponent} from "../jobs/jobs.component";
import {NgForOf, NgIf} from "@angular/common";
import {PaginatorModule} from "primeng/paginator";
import {StepperModule} from "primeng/stepper";
import {CreateJobResponse, JobService} from "../../shared/job/job.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../shared/auth/auth.service";
import {LanguageDto, LanguageService} from "../../shared/language/language.service";
import {TagModule} from "primeng/tag";
import {translate, TranslocoDirective} from "@jsverse/transloco";
import {activeTranslationIndex} from "../module-translator/module-translator.component";

@Component({
  selector: 'app-course-panel',
  standalone: true,
    imports: [
        ButtonModule,
        MenuModule,
        PanelModule,
        SharedModule,
        CheckboxModule,
        DialogModule,
        InputTextModule,
        JobsComponent,
        NgForOf,
        NgIf,
        PaginatorModule,
        StepperModule,
        TagModule,
        TranslocoDirective
    ],
  templateUrl: './course-panel.component.html',
  styleUrl: './course-panel.component.sass'
})
export class CoursePanelComponent implements OnInit, OnDestroy{
  deleted: boolean = false;

  items: MenuItem[] | undefined;
  waitForJobGuids: string[] = [];
  languages: LanguageDto[] = [];

  deleteDialogVisible = false;
  cloneDialogVisible = false;
  cloning = false;
  refreshPdfDialogVisible = false;
  generatingTexFiles = false;
  jobsAreDone = false;
  selectedLanguageIds: number[] = [];

  selectedCourse: CourseDto | undefined;
  cloneCourseDto: CloneCourseDto = {
    name: undefined,
    abbreviation: undefined,
    pruefungsordnung: undefined
  }

  @Output() coursesChanged = new EventEmitter<void>();

  @Input() course!: CourseDto;

  constructor(
    private languageService: LanguageService,
    private router: Router,
    private courseService: CourseService,
    private jobService: JobService,
    private route: ActivatedRoute,
    protected authService: AuthService,
    private messageService: MessageService,
  ) {
  }

  private subscription: any;

  ngOnInit(): void {
    this.setMenu();

    this.subscription = this.languageService.languageSubject.subscribe(() => {
      this.setMenu();
    });

    this.languageService.getLanguages().subscribe(languages => {
      this.languages = languages;
      this.selectedLanguageIds = languages.map(language => language.id);
    });
    }

    ngOnDestroy() {
    this.subscription.unsubscribe();
    }

    private setMenu() {
    this.items = [
      {
        label: translate("generatePDF"),
        icon: 'pi pi-fw pi-pencil',
        command: () => {
          this.refreshPdf(this.course);
        }
      },
      {
        label: this.course.hidden ? translate("unhide") : translate("hide"),
        icon: this.course.hidden ? 'pi pi-fw pi-eye' : 'pi pi-fw pi-eye-slash',
        command: () => {
          this.toggleHide(this.course)
        }
      },
      {
        label: translate("delete"),
        icon: 'pi pi-fw pi-trash',
        command: () => {
          this.deleteCourse(this.course)
        }
      },
      {
        label: translate("clone"),
        icon: 'pi pi-fw pi-clone',
        command: () => {
          this.cloneCourse(this.course);
        }
      }
    ];
    }

    async selectCourse(course: CourseDto) {
    await this.router.navigate(['course', course.id], {relativeTo: this.route});
  }

  cloneCourse(course: CourseDto) {
    this.selectedCourse = course;
    this.cloneCourseDto = {
      name: course.translations[activeTranslationIndex].name,
      abbreviation: course.abbreviation,
      pruefungsordnung: course.translations[activeTranslationIndex].pruefungsordnung
    }
    console.log(course);

    this.cloneDialogVisible = true;
  }

  deleteCourse(course: CourseDto) {
    this.selectedCourse = course;
    this.deleteDialogVisible = true;
  }

  async onCourseDeleted() {
    if (!this.selectedCourse) return;

    this.courseService.delete(this.selectedCourse.id).subscribe(() => {
      this.deleted = true;
      this.deleteDialogVisible = false;
    });
  }

  async onCourseCloned() {
    if (!this.selectedCourse) return;
    this.cloning = true;

    this.courseService.cloneCourse(this.selectedCourse.id, this.cloneCourseDto).subscribe((newCourseId: number) => {
      this.courseService.get(newCourseId).subscribe(
        course => {
          this.coursesChanged.emit();
          this.cloneDialogVisible = false;
          this.cloning = false;
        }
      );
    });
  }

  downloadPdf(course: CourseDto) {
    this.languageService.getLanguageByCode(this.languageService.languageCode).subscribe(language => {
        window.open(this.courseService.downloadPdfUrl(course.id, language[0].id), '_blank');
    });
  }

  refreshPdf(course: CourseDto) {
    this.selectedCourse = course;
    this.refreshPdfDialogVisible = true;
  }

  startPdfGeneration(nextCallback: any) {
    nextCallback.emit();

    this.generatingTexFiles = true;
    let finished = 0;

    this.selectedLanguageIds.forEach(languageId => {
      this.jobService.createNew(languageId, this.selectedCourse?.id!).subscribe((response: CreateJobResponse) => {
        finished++;
        const guid = response.guid;  // Extract the guid property
        this.waitForJobGuids = [...this.waitForJobGuids, guid];
        if (finished === this.selectedLanguageIds.length) {
          this.generatingTexFiles = false;
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'PDF generation started'});
        }
      });
    });
  }

  confirmPdfPublish() {
    this.refreshPdfDialogVisible = false;
    this.messageService.add({severity: 'success', summary: 'Success', detail: 'PDF successfully published'});
  }

  cancelPdfPublish() {
    this.refreshPdfDialogVisible = false;
  }

  onJobsDone() {
    this.jobsAreDone = true;
  }

  private toggleHide(course: CourseDto) {
    this.courseService.toggleHide(course).subscribe(() => {
      this.coursesChanged.emit();
      course.hidden = !course.hidden;
    });
  }

  getLastPublish(language: LanguageDto) {
    const lastPublish = this.selectedCourse?.Job.find(job => job.languageId === language.id);
    return lastPublish?.publishedAt ? new Date(lastPublish.publishedAt).toLocaleString(this.languageService.languageCode.toLowerCase()) : undefined;
  }

  protected readonly activeTranslationIndex = activeTranslationIndex;
}
