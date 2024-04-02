import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class CourseService {
  private courseURL: string = environment.backendURL + "course";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<CourseDto[]>(this.courseURL);
  }

  mockGetAll() {
    return [
      { name: "Mathe 1", id: 1},
        { name: "Mathe 2", id: 2},
        { name: "Mathe 3", id: 3},
    ];
  }

  mockGetAllObservable(facultyId: number) {

    if(facultyId === 4) {
      return new Observable<CourseDto[]>((subscriber) => {
        subscriber.next([
          {name: "MDI", id: 1},
          {name: "BIN", id: 2},
          {name: "MIN", id: 3},
        ]);
      });
    }

    else {
      return new Observable<CourseDto[]>((subscriber) => {
        subscriber.next([
        ]);
      });
    }
  }


}

export interface CourseDto {
  name: string;
  id: number;
}
