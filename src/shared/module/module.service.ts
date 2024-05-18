import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";

@Injectable()
export class ModuleService {
  private moduleURL: string = environment.backendURL + "modules";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ModuleDto[]> {
  return this.http.get<any[]>(this.moduleURL).pipe(
    map((modules) =>
      modules.map((module) => ({
        id: module.id,
        name: module.translations[0].name,  // Assumed 'name' is in 'translations[0].name'
        abbreviation: module.abbreviation,
        course: module.degreeProgram.abbreviation,
        course_name: module.degreeProgram.translations[0].name,  // Assumed 'course_name' is in 'translations[0].name'
        semester: module.semester,
        responsible: `${module.responsible.firstName} ${module.responsible.lastName}`,
        facultyId: module.degreeProgramId   // Assumed 'facultyId' is 'degreeProgramId'
      }))
    )
  );
}

  get(moduleId: number) {
    return this.http.get<ModuleDto>(this.moduleURL + "/" + moduleId);
  }

  getByCourse(courseId: number) {
    return this.http.get<ModuleDto[]>(environment.backendURL + "degrees/" + courseId + "/modules");
  }
}

export interface ModuleDto {
  id: number;
  name: string;
  abbreviation: string;
  course: string;
  semester: string;
  responsible: string;
  facultyId: number;
}
