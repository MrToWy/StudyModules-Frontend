import { Component } from '@angular/core';
import {CoursesComponent} from "../courses/courses.component";

@Component({
  selector: 'app-department-detail',
  standalone: true,
    imports: [
        CoursesComponent
    ],
  templateUrl: './department-detail.component.html',
  styleUrl: './department-detail.component.sass'
})
export class DepartmentDetailComponent {

}
