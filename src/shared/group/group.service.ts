import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private groupURL: string = environment.backendURL + "group";

  constructor(private http: HttpClient) {
  }

  getAll(degreeProgramId: number): Observable<GroupDto[]> {
    return this.http.get<any[]>(this.groupURL + "?degreeProgramId=" + degreeProgramId);
  }

  getOne(id: number): Observable<GroupDto> {
    return this.http.get<any>(this.groupURL + "/" + id);
  }

  get(requirementId: number, languageAbbreviation: string) {
    const headers = { 'language': languageAbbreviation };
    return this.http.get<any>(this.groupURL + "/" + requirementId, { headers });
  }
}

export interface GroupTranslationDto {
  id: number;
  name: string;
}

export interface GroupDto {
  id: number;
  creditsRequiredForThisGroup: number;
  degreeProgramId: number;
  modules: {id:number}[]
  translations: GroupTranslationDto[];
}
