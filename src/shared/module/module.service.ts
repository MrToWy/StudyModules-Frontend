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

  get(courseId: number) {
    return this.http.get<ModuleDto>(this.moduleURL + "/" + courseId);
  }

  mockGetAllObservable(courseId: number) {

    if(courseId === 1) {
      return new Observable<ModuleDto[]>((subscriber) => {
        subscriber.next([
          {name: "Mathe 1", id: 1, facultyId: 4, courseId: 1},
          {name: "Mathe 2", id: 2, facultyId: 4, courseId: 1},
          {name: "Mathe 3", id: 3, facultyId: 4, courseId: 1},
        ]);
      });
    }

    else {
      return new Observable<ModuleDto[]>((subscriber) => {
        subscriber.next([
        ]);
      });
    }
  }


}

export interface ModuleDto {
  name: string;
  id: number;
  courseId: number;
  facultyId: number;
}
