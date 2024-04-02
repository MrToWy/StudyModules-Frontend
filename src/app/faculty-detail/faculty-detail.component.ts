import { Component } from '@angular/core';
import {FacultyDto} from "../../shared/faculty/faculty.service";
import { ActivatedRoute } from '@angular/router';
import {CoursesComponent} from "../courses/courses.component";

@Component({
  selector: 'app-faculty-detail',
  standalone: true,
  imports: [
    CoursesComponent
  ],
  templateUrl: './faculty-detail.component.html',
  styleUrl: './faculty-detail.component.sass'
})
export class FacultyDetailComponent {
  currentFaculty: FacultyDto | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let facultyId = +params['id']; // (+) converts string 'id' to a number
      this.currentFaculty = { id: facultyId, name: "Faculty " + facultyId };
    });
  }
}
