import { Routes } from '@angular/router';
import {FacultyDetailComponent} from "./faculty-detail/faculty-detail.component";
import {FacultiesComponent} from "./faculties/faculties.component";
import {CourseDetailComponent} from "./course-detail/course-detail.component";
import {ModuleDetailComponent} from "./module-detail/module-detail.component";
import {ModuleEditComponent} from "./module-edit/module-edit.component";
import {DepartmentDetailComponent} from "./department-detail/department-detail.component";
import {ModuleGridComponent} from "./module-grid/module-grid.component";
import {LoginComponent} from "./login/login.component";
import {ModuleChangelogComponent} from "./module-changelog/module-changelog.component";
import {JobsComponent} from "./jobs/jobs.component";
import {SubmodulesComponent} from "./submodules/submodules.component";
import {RequirementsComponent} from "./requirements/requirements.component";
import {RequirementDetailComponent} from "./requirement-detail/requirement-detail.component";
import {PdfStructureComponent} from "./pdf-structure/pdf-structure.component";

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'overview', component: ModuleGridComponent },
  { path: 'faculties', component: FacultiesComponent },
  { path: 'faculty/:id', component: FacultyDetailComponent },
  { path: 'faculty/:id/department/:id', component: DepartmentDetailComponent},
  { path: 'faculty/:id/department/:id/course/:id', component: CourseDetailComponent },
  { path: 'faculty/:id/department/:id/course/:id/module/:id', component: ModuleDetailComponent},
  { path: 'module/:id', component: ModuleDetailComponent},
  { path: 'faculty/:id/department/:id/course/:id/module/:id/edit', component: ModuleEditComponent},
  { path: 'faculty/:id/department/:id/course/:id/module/:id/changes', component: ModuleChangelogComponent},
  { path: 'module/:id/edit', component: ModuleEditComponent},
  { path: 'jobs', component: JobsComponent},
  { path: 'submodules', component: SubmodulesComponent},
  { path: 'requirements', component: RequirementsComponent},
  { path: 'requirement/:id', component: RequirementDetailComponent},
  { path: 'pdfStructure', component: PdfStructureComponent},
  { path: '', redirectTo: '/faculties', pathMatch: 'full' }
];
