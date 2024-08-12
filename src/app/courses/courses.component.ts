import {Component, OnInit} from '@angular/core';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {MenuItem, MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {RouterLink} from "@angular/router";
import {CourseDto, CourseService} from "../../shared/course/course.service";
import {DepartmentService} from "../../shared/department/department.service";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {StepperModule} from "primeng/stepper";
import {NgForOf, NgIf} from "@angular/common";
import {AuthService} from "../../shared/auth/auth.service";
import {JobService} from "../../shared/job/job.service";
import {LanguageService} from "../../shared/language/language.service";
import {CheckboxModule} from "primeng/checkbox";
import {JobsComponent} from "../jobs/jobs.component";
import {PanelModule} from "primeng/panel";
import {MenuModule} from "primeng/menu";
import {CoursePanelComponent} from "../course-panel/course-panel.component";
import {UrlSegmentService} from "../../shared/url/url-segment.service";

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
    NgForOf,
    JobsComponent,
    PanelModule,
    MenuModule,
    CoursePanelComponent
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
export class CoursesComponent implements OnInit{
  courses!: CourseDto[];

  items: MenuItem[] | undefined;

  constructor(private departmentService: DepartmentService,
              private segmentService: UrlSegmentService
              ) {
  }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    const departmentId = Number(this.segmentService.getIdFromSegment("department"));

    this.departmentService.get(departmentId).subscribe(department => {
      this.courses = department.degreePrograms;
    });
  }
}
