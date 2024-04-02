import { Routes } from '@angular/router';
import {FacultyDetailComponent} from "./faculty-detail/faculty-detail.component";
import {FacultiesComponent} from "./faculties/faculties.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";

export const routes: Routes = [
  { path: 'faculties', component: FacultiesComponent },
  { path: 'faculty/:id', component: FacultyDetailComponent },
  { path: 'faculty/:id/course/:id', component: CourseDetailComponent },
  { path: '', redirectTo: '/faculties', pathMatch: 'full' }
];
