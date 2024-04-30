import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {ModuleDto} from "../module/module.service";

@Injectable()
export class CourseService {
  private courseURL: string = environment.backendURL + "degrees";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<CourseDto[]>(this.courseURL);
  }

  get(id: number) {
    return this.http.get<CourseDto>(this.courseURL + "/" + id);
  }
}

export interface CourseDto {
  name: string;
  abbreviation: string;
  id: number;
  modules: ModuleDto[];
}
