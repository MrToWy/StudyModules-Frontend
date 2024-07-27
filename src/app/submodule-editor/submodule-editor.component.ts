import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserDto, UserService} from "../../shared/user/user.service";
import {LanguageService} from "../../shared/language/language.service";
import {SubModuleDetail, SubmoduleService} from "../../shared/submodule/submodule.service";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {TooltipModule} from "primeng/tooltip";
import {TranslocoDirective} from "@jsverse/transloco";
import {InputTextModule} from "primeng/inputtext";
import {ResponsibleDropdownComponent} from "../responsible-dropdown/responsible-dropdown.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputMaskModule} from "primeng/inputmask";
import {CourseDto, CourseService} from "../../shared/course/course.service";
import {ButtonModule} from "primeng/button";
import {TextAutocompleteService} from "../../shared/text-autocomplete/text-autocomplete.service";

@Component({
  selector: 'app-submodule-editor',
  standalone: true,
  imports: [
    InputNumberModule,
    FormsModule,
    TranslocoDirective,
    InputTextModule,
    TooltipModule,
    ResponsibleDropdownComponent,
    InputTextareaModule,
    InputMaskModule,
    ButtonModule
  ],
  providers: [SubmoduleService, UserService, CourseService],
  templateUrl: './submodule-editor.component.html',
  styleUrl: './submodule-editor.component.sass'
})
export class SubmoduleEditorComponent implements OnInit {

  @Input() nextCallback: EventEmitter<void> = new EventEmitter<void>();
  @Input() subModule!: SubModuleDetail;
  @Output() subModuleChange = new EventEmitter<any>();
  @Input() languageId!: number;

  protected users: UserDto[] = [];
  protected degrees: CourseDto[] = [];
  protected submodules: SubModuleDetail[] = [];
  protected usedLanguages: string[] = [];

  creditTooltip: string | undefined;
  protected creditClass: string = "";
  abbreviationTooltip: string | undefined;
  protected abbreviationClass: string = "";
  nameTooltip: string | undefined;
  protected nameClass: string = "";
  subtitleTooltip: string | undefined;
  protected subtitleClass: string = "";
  languageTooltip: string | undefined;
  protected languageClass: string = "";

  private invalidClass = "ng-invalid ng-dirty";


  constructor(
    private userService: UserService,
    private languageService: LanguageService,
    private degreeService: CourseService,
    private submoduleService: SubmoduleService,
    private autocompleteService: TextAutocompleteService
  ) {
  }

  ngOnInit(): void {
    this.loadData();

    this.languageService.languageSubject.subscribe(() => {
      this.loadData()
    });
  }

  onSubModuleChange() {
    this.subModuleChange.emit(this.subModule);
  }

  private loadData() {
    this.userService.getAll().subscribe(users => {
      this.users = users;

      this.setInitialResponsible();
    });

    this.degreeService.getAll().subscribe(degrees => {
      this.degrees = degrees;
    });

    this.submoduleService.getAll().subscribe(submodules => {
      this.submodules = submodules;
    });

    this.autocompleteService.getAutocompleteSuggestionsSpokenLanguage(this.languageId).subscribe(suggestions => {
      this.usedLanguages = suggestions;
    });
  }

  private setInitialResponsible(): void {
    if (this.subModule && this.subModule.responsible && this.users.length) {
      this.subModule.responsible = this.users.find(user => user.id === this.subModule.responsible.id) || this.subModule.responsible;
    }
  }

  validate(): boolean {
    let valid =
      this.validateAbbreviation() &&
      this.validateName() &&
      this.validateSubtitle() &&
      this.validateLanguage() &&
      this.validateCredits();

    if (valid) {
      this.onSubModuleChange();
      this.nextCallback.emit();
    }

    return valid;
  }

  validateAbbreviation(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.abbreviationClass === "") {
      return true;
    }

    this.abbreviationClass = "";
    this.abbreviationTooltip = "";

    const hasAbbreviation = this.subModule.abbreviation !== undefined && this.subModule.abbreviation.length > 0;

    if (!hasAbbreviation) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = "Bitte geben Sie eine Abkürzung ein.";
      return false;
    }

    const pattern = /^[A-Z]{3}-[0-9]{3}-[0-9]{2}$/;
    if (!pattern.test(this.subModule.abbreviation)) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = "Die Abkürzung sollte dem Muster ABC-100-01 entsprechen.";
      return false;
    }

    const courseAbbreviation = this.subModule.abbreviation.split("-")[0];
    const course = this.degrees.find(degree => degree.abbreviation === courseAbbreviation);
    if (!course) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = "Der Studiengang mit der Abkürzung " + courseAbbreviation + " existiert nicht.";
      return false;
    }

    const duplicate = this.submodules.find(submodule => submodule.abbreviation === this.subModule.abbreviation);
    if (duplicate && duplicate.id !== this.subModule.id) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = "Die Abkürzung ist bereits vergeben.";
      return false;
    }

    return true;
  }

  validateName(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.nameClass === "") {
      return true;
    }

    this.nameClass = "";
    this.nameTooltip = "";

    const hasName = this.subModule?.translations[0].name !== undefined && this.subModule.translations[0].name.length > 0;

    if (!hasName) {
      this.nameClass = this.invalidClass;
      this.nameTooltip = "Bitte geben Sie einen Namen ein.";
      return false;
    }

    return true
  }

  validateSubtitle(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.subtitleClass === "") {
      return true;
    }

    this.subtitleClass = "";
    this.subtitleTooltip = "";

    const hasSubtitle = this.subModule?.translations[0].subtitle !== undefined
      && this.subModule.translations[0].subtitle.length > 0;

    if (!hasSubtitle) {
      this.subtitleClass = this.invalidClass;
      this.subtitleTooltip = "Bitte geben Sie einen Untertitel ein.";
      return false;
    }

    return true;
  }

  validateLanguage(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.languageClass === "") {
      return true;
    }

    this.languageClass = "";
    this.languageTooltip = "";

    const hasLanguage = this.subModule.translations[0].spokenlanguage !== undefined
      && this.subModule.translations[0].spokenlanguage.length > 0;

    if (!hasLanguage) {
      this.languageClass = this.invalidClass;
      this.languageTooltip = "Bitte wählen Sie eine Sprache aus.";
      return false;
    }

    // is in usedLanguages
    if (!this.usedLanguages.includes(this.subModule.translations[0].spokenlanguage)) {
      this.languageClass = this.invalidClass;
      this.languageTooltip = "Die Sprache ist nicht in den verwendeten Sprachen enthalten. Entweder gibt es einen Tippfehler, oder diese Sprache ist neu.";
      return false;
    }

    return true;
  }

  // ToDo: Refactor duplicate
  validateCredits(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.creditClass === "") {
      return true;
    }

    this.creditClass = "";
    this.creditTooltip = "";


    const hasCredits = this.subModule.credits !== undefined && this.subModule.credits > 0;

    if (!hasCredits) {
      this.creditClass = this.invalidClass;
      this.creditTooltip = "Bitte geben Sie eine gültige Anzahl an Credits ein (>0).";
      return false;
    }

    return true;
  }
}
