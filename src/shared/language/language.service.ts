import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslocoService} from "@jsverse/transloco";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

export interface LanguageDto {
  abbreviation: string;
  name: string;
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translocoService: TranslocoService, private http: HttpClient) {
  }

  private languageURL: string = environment.backendURL + "language";

  languageSubject = new BehaviorSubject(this.languageCode);

  getLanguages() {
    return this.http.get<LanguageDto[]>(this.languageURL);
  }

 set languageCode(value: string) {
   this.languageSubject.next(value);
   localStorage.setItem('language', value);
   this.translocoService.setActiveLang(value);
 }

 get languageCode() {
   return localStorage.getItem('language')??"de";
 }
}
