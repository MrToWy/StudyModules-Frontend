import { Component } from '@angular/core';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseDto, CourseService} from "../../shared/course/course.service";

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
  providers: [CourseService, MessageService]
})
export class CoursesComponent {
courses!: CourseDto[];

    selectedCourse!: CourseDto;
    facultyId!: number;

    constructor(private courseService: CourseService,
                private router: Router,
                private route: ActivatedRoute) {}

    ngOnInit() {

      // get faculty id from url
      this.facultyId = Number(this.router.url.split("/")[2]);

        //this.courseService.mockGetAllObservable(this.facultyId).subscribe((data) => {
        //    this.courses = data;
        //});
    }

    async selectCourse(course: CourseDto) {
        await this.router.navigate(['course', course.id], {relativeTo: this.route});
    }
}
