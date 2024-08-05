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

  toggleHide(course: CourseDto) {
    return this.http.patch(this.courseURL + "/" + course.id, {hidden: !course.hidden});
  }
}

export interface CourseDto {
  name: string;
  abbreviation: string;
  hidden: boolean;
  id: number;
  modules: ModuleDto[];
  Job: { id: number, languageId: number, publishedAt: string }[];
  department: { id:number, facultyId: number };
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
