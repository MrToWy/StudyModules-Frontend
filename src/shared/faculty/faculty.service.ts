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
}

export interface FacultyDto {
  id: number;
  color?: string;
  translations: FacultyTranslationDto[];
  departments: DepartmentIds[];
}

interface DepartmentIds {
  id: number;
  degreePrograms: DegreeProgramIds[];
}

interface DegreeProgramIds {
  id: number;
}

interface FacultyTranslationDto {
  name: string;
  languageId: number;
  facultyId: number;
}
