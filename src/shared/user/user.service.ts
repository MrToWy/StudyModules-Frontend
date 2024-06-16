import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DepartmentDto} from "../department/department.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL: string = environment.backendURL + "user";

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<UserDto[]>(this.userURL);
  }
}

export interface UserDto {
  id: number;
  firstName: string;
  lastName: string;
  translations: UserTranslationDto[];
}

export interface UserTranslationDto {
  title: string;
}
