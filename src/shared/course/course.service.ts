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

  delete(id: number) {
    return this.http.delete(this.courseURL + "/" + id);
  }

  cloneCourse(id:number, cloneCourseDto: CloneCourseDto) {
    return this.http.post<number>(this.courseURL + "/" + id + "/clone", cloneCourseDto);
  }

  downloadPdfUrl(id: number, language: number) {
    return this.courseURL + "/" + id + "/pdf/" + language;
  }

  hasPdf(courseId: number, languageId: number) {
    return this.http.get<boolean>(this.courseURL + "/" + courseId + "/pdf/" + languageId + "/exists");
  }
}

export interface CourseDto {
  name: string;
  abbreviation: string;
  id: number;
  modules: ModuleDto[];
  translations: CourseTranslationDto[];
  publishedJobId: number | undefined;
}

export interface CourseTranslationDto {
  name: string;
  pruefungsordnung: string | undefined;
}


export interface CloneCourseDto {
  name: string | undefined;
  abbreviation: string | undefined;
  pruefungsordnung: string | undefined;
}
