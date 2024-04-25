import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {CourseDto} from "../course/course.service";
import {FacultyDto} from "../faculty/faculty.service";

@Injectable()
export class DepartmentService {
  private departmentURL: string = environment.backendURL + "department";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<DepartmentDto[]>(this.departmentURL);
  }

  get(id: number) {
    return this.http.get<DepartmentDto>(this.departmentURL + "/" + id);
  }
}

export interface DepartmentDto {
  name: string;
  id: number;
  degreePrograms: CourseDto[];
  faculty: FacultyDto;
}
