import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubModule, SubModuleTranslation} from "../module/module.service";
import {UserDto} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class SubmoduleService {
  private submoduleURL: string = environment.backendURL + "submodules";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.submoduleURL);
  }

  getOne(id: number): Observable<SubModule> {
    return this.http.get<any>(this.submoduleURL + "/" + id);
  }

  get(id: number, languageAbbreviation: string|undefined): Observable<SubModuleDetail> {
    let headers = {};
    if (languageAbbreviation) {
      headers = {'language': languageAbbreviation.toUpperCase()};
    }
    return this.http.get<SubModuleDetail>(this.submoduleURL + "/" + id, {headers});
  }
}

export interface SubModuleDetail {
  id: number;
  number: number;
  name: string;
  abbreviation: string;
  course: string;
  courseId: number;
  course_name: string;
  departmentId: number;
  semester: number;
  responsible: UserDto;
  facultyId: number;
  specialization: string;
  elective: boolean;
  weeklyHours: number;
  credits: number;
  hoursPresence: number;
  hoursSelf: number;
  groupSize: number;
  requirementsHardId: number;
  requirementsSoftId: number;

  translations: SubModuleTranslation[];
  modules: {
    degreeProgram: { abbreviation: string }
    requirementsSoft: { translations: { name: string }[] }
  }[];
}
