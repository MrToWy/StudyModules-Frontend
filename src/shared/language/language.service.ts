import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {translate, TranslocoService} from "@jsverse/transloco";
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

  getLanguageByCode(code: string) {
    return this.http.get<LanguageDto[]>(this.languageURL + "/" + code);
  }

 set languageCode(value: string) {
   this.translocoService.setActiveLang(value);

   this.languageSubject.next(value);
   localStorage.setItem('language', value);
 }

 get languageCode() {
   return localStorage.getItem('language')??"de";
 }

 getHeader(language: LanguageDto) {
    if(language.abbreviation === "DE") return translate("fillModuleText");
    if(language.abbreviation === "EN") return translate("addEnglishTexts");
    return translate("addOtherLanguageTexts") + language.abbreviation;
  }
}
