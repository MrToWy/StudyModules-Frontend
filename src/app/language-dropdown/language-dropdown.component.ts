import { Component } from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {TranslocoService} from "@jsverse/transloco";

@Component({
  selector: 'app-language-dropdown',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './language-dropdown.component.html',
  styleUrl: './language-dropdown.component.sass'
})
export class LanguageDropdownComponent {
  constructor(private translocoService: TranslocoService) {
  }

    languages: any[] | undefined;

    selectedLanguage: any | undefined;

    ngOnInit() {
        this.languages = [
            { name: 'DE', code: 'de' },
            { name: 'EN', code: 'en' }
        ];

        this.selectedLanguage = this.languages.find(
            (lang) => lang.code === localStorage.getItem('language')
        );

        if (!this.selectedLanguage) {
            this.selectedLanguage = this.languages[0];
        }
    }

    setLanguage(lang: any) {
        this.translocoService.setActiveLang(lang.code.toLowerCase());
        this.selectedLanguage = lang;
        localStorage.setItem('language', lang.code.toLowerCase());
    }
}
