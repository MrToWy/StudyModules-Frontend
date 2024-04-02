import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class FacultyService {
  private facultyURL: string = environment.backendURL + "faculty";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<FacultyDto[]>(this.facultyURL);
  }

  mockGetAll() {
    return [
      { name: "Faculty 1" },
      { name: "Faculty 2" },
      { name: "Faculty 3" },
      { name: "Faculty 4" },
    ];
  }

  mockGetAllObservable() {
    return new Observable<FacultyDto[]>((subscriber) => {
      subscriber.next([
        { name: "Faculty 1", id: 1},
        { name: "Faculty 2", id: 2},
        { name: "Faculty 3", id: 3},
        { name: "Faculty 4", id: 4},
      ]);
    });
  }


}

export interface FacultyDto {
  name: string;
  id: number;
}
