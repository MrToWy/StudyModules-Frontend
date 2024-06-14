import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";

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
          elective: module.elective
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

export interface Person {
  id: number;
  email?: string;
  firstName: string;
  lastName: string;
  password?: string;
  role?: string;
  degreeProgramId?: number;
  translations?: PersonTranslation[];
}

export interface PersonTranslation {
  id: number;
  languageId: number;
  userId: number;
  title: string;
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
  responsible: Person;
  requirementsSoft: Requirement;
  requirementsHard: Requirement;
  subModules: SubModule[];
}
