import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequirementService {

  private requirementURL: string = environment.backendURL + "requirement";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<RequirementDto[]> {
    return this.http.get<any[]>(this.requirementURL);
  }

  getOne(id: number): Observable<RequirementDto> {
    return this.http.get<any>(this.requirementURL + "/" + id);
  }
}

export interface RequirementTranslationDto {
  name: string;
}

export interface RequirementDto {
  id: number;
  translations: RequirementTranslationDto[];
}
