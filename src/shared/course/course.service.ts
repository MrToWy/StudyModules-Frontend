import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

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

  mockGetAllObservable(facultyId: number) {

    if(facultyId === 4) {
      return new Observable<CourseDto[]>((subscriber) => {
        subscriber.next([
          {
            name: "MDI", id: 1,
            abbreviation: ''
          },
          {
            name: "BIN", id: 2,
            abbreviation: ''
          },
          {
            name: "MIN", id: 3,
            abbreviation: ''
          },
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
  abbreviation: string;
  id: number;
}
