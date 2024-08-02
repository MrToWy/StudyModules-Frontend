import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Requirement, SubModule, SubModuleTranslation} from "../module/module.service";
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
  getEmptySubModuleDetail(): SubModuleDetail {
    return {
      id: 0,
      number: 0,
      abbreviation: "",
      degreeProgramId: 0,
      semester: "0",
      responsible: {id: 0, firstName: "", lastName: "", translations: [{title: ""}]},
      responsibleId: 0,
      weeklyHours: 0,
      credits: 0,
      hoursPresence: 0,
      hoursSelf: 0,
      groupSize: 0,
      requirementsSoftId: 0,
      requirementsSoft: {id: 0, requiredSemesters: "", modules: [], translations: [{name: "keine", languageId: 1}, {name: "none", languageId: 2}]},
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
  abbreviation: string;
  degreeProgramId: number;
  semester: string;
  responsible: UserDto;
  responsibleId: number;
  weeklyHours: number;
  credits: number;
  hoursPresence: number;
  hoursSelf: number;
  groupSize: number;
  requirementsSoftId: number;
  requirementsSoft: Requirement;

  translations: SubModuleTranslation[];
  modules: {
    degreeProgram: { abbreviation: string }
    requirementsSoft: { translations: { name: string }[] }
  }[];
}
