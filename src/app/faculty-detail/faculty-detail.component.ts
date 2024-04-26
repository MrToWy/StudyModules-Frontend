import {Component, Input} from '@angular/core';
import {FacultyDto} from "../../shared/faculty/faculty.service";
import {ActivatedRoute, Router} from '@angular/router';
import {CoursesComponent} from "../courses/courses.component";
import {DepartmentsComponent} from "../departments/departments.component";

@Component({
  selector: 'app-faculty-detail',
  standalone: true,
  imports: [
    CoursesComponent,
    DepartmentsComponent
  ],
  templateUrl: './faculty-detail.component.html',
  styleUrl: './faculty-detail.component.sass'
})
export class FacultyDetailComponent {

  @Input()
  currentFaculty: FacultyDto | undefined;

  constructor(private router: Router) {
    this.currentFaculty = router.getCurrentNavigation()?.extras.state?.['faculty'];
  }
}
