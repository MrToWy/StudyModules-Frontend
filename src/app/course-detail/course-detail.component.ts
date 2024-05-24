import { Component } from '@angular/core';
import {CoursesComponent} from "../courses/courses.component";
import {ModuleGridComponent} from "../module-grid/module-grid.component";

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [
    CoursesComponent,
    ModuleGridComponent
  ],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.sass'
})
export class CourseDetailComponent {

  constructor() {
  }
}
