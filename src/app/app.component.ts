import {AfterViewInit, Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {NgIf} from "@angular/common";
import {AuthService} from "../shared/auth/auth.service";
import {AuthModule} from "../shared/auth/auth.module";
import {MainComponent} from "./main/main.component";
import {AuthInterceptor} from "../shared/auth/auth.interceptor";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LangDefinition, TranslocoService} from "@jsverse/transloco";
import {PrimeNGConfig} from "primeng/api";
import {filter} from "rxjs";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarModule, FormsModule, LoginComponent, NgIf, AuthModule, MainComponent],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'study-modules';
  date: any;

  constructor(protected authService: AuthService, private translocoService: TranslocoService, private config: PrimeNGConfig) {
    const activeLang = localStorage.getItem('language');
    translocoService.setActiveLang(activeLang??"de");
  }

  ngOnInit() {
    let activeLanguage = this.translocoService.getActiveLang();
    this.translocoService.load(activeLanguage).subscribe(() => this.loadTranslations());
    for(const language of this.translocoService.getAvailableLangs()) {
      if (typeof language === "string") {
        if (activeLanguage !== (language as string)) {
          this.translocoService.load(language as string).subscribe();
        }
      } else {
        let lang = language as LangDefinition;
        if (activeLanguage !== lang.id) {
          this.translocoService.load(lang.id).subscribe();
        }
      }
    }

    this.translocoService.events$
      .pipe(filter(e => e.type === 'langChanged'))
      .subscribe(() => this.loadTranslations());
  }

  private loadTranslations() {
    this.config.setTranslation(this.translocoService.translateObject('primeng'));
  }
}
