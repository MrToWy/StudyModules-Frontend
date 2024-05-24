import { Component } from '@angular/core';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseDto, CourseService} from "../../shared/course/course.service";
import {DepartmentService} from "../../shared/department/department.service";

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    ToastModule,
    TableModule,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.sass',
  providers: [DepartmentService, MessageService]
})
export class CoursesComponent {
courses!: CourseDto[];

    selectedCourse!: CourseDto;

    constructor(private departmentService: DepartmentService,
                private router: Router,
                private route: ActivatedRoute) {}

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
}
