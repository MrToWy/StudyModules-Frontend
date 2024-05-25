import {Component} from '@angular/core';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ActivatedRoute, Router} from "@angular/router";
import {CloneCourseDto, CourseDto, CourseService} from "../../shared/course/course.service";
import {DepartmentService} from "../../shared/department/department.service";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";

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
    PaginatorModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.sass',
  providers: [CourseService, DepartmentService, MessageService]
})
export class CoursesComponent {
  courses!: CourseDto[];

  deleteDialogVisible = false;
  cloneDialogVisible = false;
  cloning = false;

  selectedCourse: CourseDto | undefined;
  cloneCourseDto: CloneCourseDto = {
    name: undefined,
    abbreviation: undefined,
    pruefungsordnung: undefined
  }

  constructor(private departmentService: DepartmentService,
              private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute) {
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
  }

  refreshPdf(course: CourseDto, $event: MouseEvent) {
    $event.stopPropagation();
  }
}
