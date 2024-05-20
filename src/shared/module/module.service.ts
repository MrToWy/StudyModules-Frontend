import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../environments/environment";
import {map, Observable} from "rxjs";

@Injectable()
export class ModuleService {
  private moduleURL: string = environment.backendURL + "modules";

  constructor(private http: HttpClient) { }

  getAll(): Observable<ModuleDto[]> {
  return this.http.get<any[]>(this.moduleURL).pipe(
    map((modules) =>
      modules.map((module) => ({
        id: module.id,
        name: module.translations[0].name,  // Assumed 'name' is in 'translations[0].name'
        abbreviation: module.abbreviation,
        course: module.degreeProgram.abbreviation,
        course_name: module.degreeProgram.translations[0].name,  // Assumed 'course_name' is in 'translations[0].name'
        semester: module.semester,
        responsible: `${module.responsible.firstName} ${module.responsible.lastName}`,
        facultyId: module.degreeProgramId   // Assumed 'facultyId' is 'degreeProgramId'
      }))
    )
  );
}

  get(moduleId: number) {
    return this.http.get<ModuleDetail>(this.moduleURL + "/" + moduleId);
  }

  getByCourse(courseId: number) {
    return this.http.get<ModuleDto[]>(environment.backendURL + "degrees/" + courseId + "/modules");
  }
}

export interface ModuleDto {
  id: number;
  name: string;
  abbreviation: string;
  course: string;
  semester: string;
  responsible: string;
  facultyId: number;
}

export interface ModuleTranslation {
  id: number;
  name: string;
  subtitle: string;
  niveau: string;
  type: string;
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
}

export interface SubModule {
  id: number;
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
  results?: any;  // Newly added field
  contents?: any; // Newly added field
  eventType?: any; // Newly added field
  language?: any; // Newly added field
  material?: any; // Newly added field
  responsible: Person; // Changed field
  requirementsSoft: Requirement; // Changed field
  requirementsHard: Requirement; // Changed field
  subModules: SubModule[]; // Add new field
}
