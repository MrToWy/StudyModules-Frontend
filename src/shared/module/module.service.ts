import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";
import {UserDto} from "../user/user.service";

@Injectable()
export class ModuleService {
  private moduleURL: string = environment.backendURL + "modules";

  constructor(private http: HttpClient) {
  }

  getAll(detailed: boolean, courseId: number | undefined): Observable<ModuleDto[]> {
    return this.http.get<any[]>(this.moduleURL, {
      headers: {
        detailed: detailed.toString(),
        courseId: courseId?.toString() || ""
      }
    }).pipe(
      map((modules) =>
        modules.map((module) => ({
          id: module.id,
          name: module.translations[0].name,
          abbreviation: module.abbreviation,
          course: module.degreeProgram.abbreviation,
          courseId: module.degreeProgram.id,
          course_name: module.degreeProgram.translations[0].name,
          departmentId: module.degreeProgram.department.id,
          semester: module.semester,
          responsible: `${module.responsible.firstName} ${module.responsible.lastName}`,
          facultyId: module.degreeProgram.department.facultyId,
          specialization: module.specialization,
          elective: module.elective,
          requirementsHardId: module.requirementsHardId,
          requirementsSoftId: module.requirementsSoftId
        }))
      )
    );
  }

  get(moduleId: number, language?: string) {
    let headers = {};
    if (language) {
      headers = {'language': language.toUpperCase()};
    }
    return this.http.get<ModuleDetail>(this.moduleURL + "/" + moduleId, {headers});
  }

  getByCourse(courseId: number) {
    return this.http.get<ModuleDto[]>(environment.backendURL + "degrees/" + courseId + "/modules");
  }

  save(currentModule: ModuleDetail) {
    // wait 4 seconds and return the module
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(currentModule);
        subscriber.complete();
      }, 4000);
    });
  }

  getEmptyModuleDetail(): ModuleDetail {
    return {
      id: 0,
      number: 0,
      abbreviation: "",
      credits: 0,
      specialization: false,
      elective: false,
      hoursPresence: 0,
      hoursSelf: 0,
      semester: "",
      courseLength: 1,
      requirementsHardId: 0,
      requirementsSoftId: 0,
      responsibleId: 0,
      degreeProgramId: 0,
      groupId: 0,
      translations: [],
      responsible: {id: 0, firstName: "", lastName: "", translations: [{title: ""}]},
      requirementsSoft: {id: 0, translations: [{name: ""}]},
      requirementsHard: {id: 0, translations: [{name: ""}]},
      subModules: []
    };

  }
}

export interface ModuleDto {
  id: number;
  name: string;
  abbreviation: string;
  course: string;
  courseId: number;
  departmentId: number;
  semester: string;
  responsible: string;
  facultyId: number;
  specialization: boolean;
  elective: boolean;
  requirementsHardId: number;
  requirementsSoftId: number;
}

export interface ModuleTranslation {
  id: number;
  name: string;
  subtitle: string;
  exam: string;
  learningOutcomes: string;
  languageId: number;
  moduleId: number;
  description?: string;  // Newly added field
}

export interface RequirementTranslation {
  name: string;
}

export interface Requirement {
  id: number;
  translations: RequirementTranslation[];
}

export interface SubModuleTranslation {
  id: number;
  type: string;
  content: string;
  presenceRequirements: string;
  selfStudyRequirements: string;
  spokenlanguage: string;
  languageId: number;
  subModuleId: number;
  literature: string;
}

export interface SubModule {
  id: number;
  abbreviation: string;
  number: number;
  weeklyHours: number;
  groupSize: number;
  moduleId: number;
  translations: SubModuleTranslation[];
}

export interface ModuleDetail {
  id: number;
  number: number;
  abbreviation: string;
  credits: number;
  specialization: boolean;
  elective: boolean;
  hoursPresence: number;
  hoursSelf: number;
  semester: string;
  courseLength: number;
  requirementsHardId: number;
  requirementsSoftId: number;
  responsibleId: number;
  degreeProgramId: number;
  groupId: number;
  translations: ModuleTranslation[];
  results?: any;
  contents?: any;
  eventType?: any;
  language?: any;
  material?: any;
  responsible: UserDto;
  requirementsSoft: Requirement;
  requirementsHard: Requirement;
  subModules: SubModule[];
}
