import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

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
        { name: "Abteilung Informatik", id: 1},
        { name: "Abteilung Betriebswirtschaft", id: 2},
        { name: "Abteilung Wirtschaftsinformatik", id: 3}
      ]);
    });
  }


}

export interface DepartmentDto {
  name: string;
  id: number;
}
