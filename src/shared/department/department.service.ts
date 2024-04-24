import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {CourseDto} from "../course/course.service";

@Injectable()
export class DepartmentService {
  private departmentURL: string = environment.backendURL + "department";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<DepartmentDto[]>(this.departmentURL);
  }

  mockGetAllObservable() {
    return new Observable<DepartmentDto[]>((subscriber) => {
      subscriber.next([
        { name: "Informatik", id: 1, courses: [{name: "MDI", id: 1},
          {name: "BIN", id: 2},
          {name: "MIN", id: 3},]},
        { name: "Betriebswirtschaft", id: 2, courses: [{name: "BWL1", id: 1},
          {name: "BWL2", id: 2},
          {name: "BWL3", id: 3},]},
        { name: "Wirtschaftsinformatik", id: 3, courses: [{name: "WI1", id: 1},
          {name: "W1", id: 2}]}
      ]);
    });
  }


}

export interface DepartmentDto {
  name: string;
  id: number;
  courses: CourseDto[];
}
