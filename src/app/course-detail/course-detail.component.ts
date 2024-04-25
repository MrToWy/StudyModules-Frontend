import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {CoursesComponent} from "../courses/courses.component";
import {CourseDto} from "../../shared/course/course.service";
import {ModulesComponent} from "../modules/modules.component";

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CoursesComponent,
    ModulesComponent
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.sass'
})
export class CourseDetailComponent {
  currentCourse: CourseDto | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let courseId = +params['id']; // (+) converts string 'id' to a number
      this.currentCourse = { id: courseId, name: "Studiengang " + courseId, abbreviation: '', modules: []};
    });
  }
}
