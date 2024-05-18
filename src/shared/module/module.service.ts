import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class ModuleService {
  private moduleURL: string = environment.backendURL + "modules";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<ModuleDto[]>(this.moduleURL);
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
  abbreviation: string;
  courseId: number;
  facultyId: number;
}
