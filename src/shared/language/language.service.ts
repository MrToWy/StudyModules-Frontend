import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslocoService} from "@jsverse/transloco";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  constructor(private translocoService: TranslocoService) {
  }


  languageSubject = new BehaviorSubject(this.languageCode);

 set languageCode(value: string) {
   this.languageSubject.next(value);
   localStorage.setItem('language', value);
   this.translocoService.setActiveLang(value);
 }

 get languageCode() {
   return localStorage.getItem('language')??"de";
 }
}
