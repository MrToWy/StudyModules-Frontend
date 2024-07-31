import {Injectable} from '@angular/core';
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

  get(id: number, languageAbbreviation: string | undefined): Observable<SubModuleDetail> {
    let headers = {};
    if (languageAbbreviation) {
      headers = {'language': languageAbbreviation.toUpperCase()};
    }
    return this.http.get<SubModuleDetail>(this.submoduleURL + "/" + id, {headers});
  }

  save(currentSubmodule: SubModule) {
    if(currentSubmodule.id > 0)
      return this.http.put(this.submoduleURL, currentSubmodule);

    return this.http.post(this.submoduleURL, currentSubmodule);
  }

  getEmpty() {
    return {
      id: 0,
      abbreviation: "",
      number: 0,
      weeklyHours: 0,
      groupSize: 0,
      responsible: {id: 0, firstName: "", lastName: "", translations: [{title: ""}]},
      translations: [
        {
          id: 0,
          name: "",
          subtitle: "",
          type: "",
          semester: "",
          exam: "",
          content: "",
          presenceRequirements: "",
          selfStudyRequirements: "",
          spokenlanguage: "",
          learningOutcomes: "",
          selfStudyHints: "",
          languageId: 1,
          subModuleId: 0,
          literature: ""
        },
        {
          id: 0,
          name: "",
          subtitle: "",
          type: "",
          semester: "",
          exam: "",
          content: "",
          presenceRequirements: "",
          selfStudyRequirements: "",
          spokenlanguage: "",
          learningOutcomes: "",
          selfStudyHints: "",
          languageId: 2,
          subModuleId: 0,
          literature: ""
        }
      ],
    }
  }

  getEmptySubModuleDetail(): SubModuleDetail {
    return {
      id: 0,
      number: 0,
      name: "",
      abbreviation: "",
      course: "",
      courseId: 0,
      course_name: "",
      departmentId: 0,
      semester: 0,
      responsible: {id: 0, firstName: "", lastName: "", translations: [{title: ""}]},
      responsibleId: 0,
      facultyId: 0,
      specialization: "",
      elective: false,
      weeklyHours: 0,
      credits: 0,
      hoursPresence: 0,
      hoursSelf: 0,
      groupSize: 0,
      requirementsHardId: 0,
      requirementsSoftId: 0,
      translations: [
        {
          id: 0,
          name: "",
          subtitle: "",
          type: "",
          semester: "",
          exam: "",
          content: "",
          presenceRequirements: "",
          selfStudyRequirements: "",
          spokenlanguage: "",
          learningOutcomes: "",
          selfStudyHints: "",
          languageId: 1,
          subModuleId: 0,
          literature: ""
        },
        {
          id: 0,
          name: "",
          subtitle: "",
          type: "",
          semester: "",
          exam: "",
          content: "",
          presenceRequirements: "",
          selfStudyRequirements: "",
          spokenlanguage: "",
          learningOutcomes: "",
          selfStudyHints: "",
          languageId: 2,
          subModuleId: 0,
          literature: ""
        }
      ],
      modules: [
        {
          degreeProgram: {abbreviation: ""},
          requirementsSoft: {translations: [{name: ""}]}
        }
      ]
    };
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
  responsibleId: number;
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
