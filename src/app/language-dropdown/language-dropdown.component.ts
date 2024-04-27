import { Component } from '@angular/core';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {LanguageService} from "../../shared/language/language.service";

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
  constructor(private languageService: LanguageService) {
  }

    languages: any[] | undefined;

    selectedLanguage: any | undefined;

    ngOnInit() {
        this.languages = [
            { name: 'DE', code: 'de' },
            { name: 'EN', code: 'en' }
        ];

        this.selectedLanguage = this.languages.find(
            (lang) => lang.code === this.languageService.languageCode
        );

        if (!this.selectedLanguage) {
            this.selectedLanguage = this.languages[0];
        }
    }

    setLanguage(lang: any) {
        this.languageService.languageCode = lang.code.toLowerCase();
        this.selectedLanguage = lang;
    }
}
