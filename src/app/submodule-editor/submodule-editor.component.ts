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
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";

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
    ButtonModule,
    AutoCompleteModule
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
  protected filteredLanguages: string[] = [];
  protected usedSelfStudyHints: string[] = [];
  protected filteredSelfStudyHints: string[] = [];
  protected usedTypes: string[]= [];
  protected filteredTypes: string[] = [];
  protected usedExams: string[] = [];
  protected filteredExams: string[] = [];

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
  selfStudyHintsTooltip: string | undefined;
  protected selfStudyHintsClass: string = "";
  weeklyHoursTooltip: string | undefined;
  protected weeklyHoursClass: string = "";
  semesterTooltip: string | undefined;
  protected semesterClass: string = "";
  typeTooltip: string | undefined;
  protected typeClass: string = "";
  examTooltip: string | undefined;
  protected examClass: string = "";
  groupSizeTooltip: string | undefined;
  protected groupSizeClass: string = "";
  selfStudyHoursTooltip: string | undefined;
  protected selfStudyHoursClass: string = "";
  presenceHoursTooltip: string | undefined;
  protected presenceHoursClass: string = "";


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

    this.autocompleteService.getAutocompleteSuggestions(this.languageId, 'spokenlanguage').subscribe(suggestions => {
      this.usedLanguages = suggestions;
    });

    this.autocompleteService.getAutocompleteSuggestions(this.languageId, 'selfStudyHints').subscribe(suggestions => {
      this.usedSelfStudyHints = suggestions;
    });

    this.autocompleteService.getAutocompleteSuggestions(this.languageId, 'type').subscribe(suggestions => {
      this.usedTypes = suggestions;
    });

    this.autocompleteService.getAutocompleteSuggestions(this.languageId, 'exam').subscribe(suggestions => {
      this.usedExams = suggestions;
    });
  }

  private setInitialResponsible(): void {
    if (this.subModule && this.subModule.responsible && this.users.length) {
      this.subModule.responsible = this.users.find(user => user.id === this.subModule.responsible.id) || this.subModule.responsible;
    }
  }

  validate(): boolean {
    let isAbbreviationValid = this.validateAbbreviation();
    let isNameValid = this.validateName();
    let isSubtitleValid = this.validateSubtitle();
    let isLanguageValid = this.validateLanguage();
    let isSelfStudyHintsValid = this.validateSelfStudyHints();
    let isCreditsValid = this.validateCredits();
    let isSemesterValid = this.validateSemester();
    let isTypeValid = this.validateType();
    let isExamValid = this.validateExam();
    let isWeeklyHoursValid = this.validateWeeklyHours();
    let isGroupSizeValid = this.validateGroupSize();
    let isSelfStudyHoursValid = this.validateSelfStudyHours();
    let isPresenceHoursValid = this.validatePresenceHours();

    let valid = isAbbreviationValid &&
      isNameValid &&
      isSubtitleValid &&
      isLanguageValid &&
      isSelfStudyHintsValid &&
      isSemesterValid &&
      isTypeValid &&
      isExamValid &&
      isWeeklyHoursValid &&
      isGroupSizeValid &&
      isSelfStudyHoursValid &&
      isPresenceHoursValid &&
      isCreditsValid;


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

  searchLanguage(event: AutoCompleteCompleteEvent) {
    this.filteredLanguages = this.usedLanguages.filter(language => language.toLowerCase().includes(event.query.toLowerCase()));
  }

  validateSelfStudyHints(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.selfStudyHintsClass === "") {
      return true;
    }

    this.selfStudyHintsClass = "";
    this.selfStudyHintsTooltip = "";

    const hasSelfStudyHints = this.subModule.translations[0].selfStudyHints !== undefined
      && this.subModule.translations[0].selfStudyHints.length > 0;

    if (!hasSelfStudyHints) {
      this.selfStudyHintsClass = this.invalidClass;
      this.selfStudyHintsTooltip = "Bitte geben Sie einen Hinweis zur Selbststudium ein.";
      return false;
    }

    if (!this.usedSelfStudyHints.includes(this.subModule.translations[0].selfStudyHints)) {
      this.selfStudyHintsClass = this.invalidClass;
      this.selfStudyHintsTooltip = "Der Hinweis ist nicht in den verwendeten Hinweisen enthalten. Entweder gibt es einen Tippfehler, oder dieser Hinweis ist neu.";
      return false;
    }

    return true;
  }

  validateType(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.typeClass === "") {
      return true;
    }

    this.typeClass = "";
    this.typeTooltip = "";

    const hasType = this.subModule.translations[0].type !== undefined
      && this.subModule.translations[0].type.length > 0;

    if (!hasType) {
      this.typeClass = this.invalidClass;
      this.typeTooltip = "Bitte geben Sie die Veranstaltungsart ein.";
      return false;
    }

    if (!this.usedTypes.includes(this.subModule.translations[0].type)) {
      this.typeClass = this.invalidClass;
      this.typeTooltip = "Die Veranstaltungsart ist nicht in den verwendeten Veranstaltungsarten enthalten. Entweder gibt es einen Tippfehler, oder diese Veranstaltungsart ist neu.";
      return false;
    }

    return true;
  }

  validateExam(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.examClass === "") {
      return true;
    }

    this.examClass = "";
    this.examTooltip = "";

    const hasExam = this.subModule.translations[0].exam !== undefined
      && this.subModule.translations[0].exam.length > 0;

    if (!hasExam) {
      this.examClass = this.invalidClass;
      this.examTooltip = "Bitte geben Sie die Prüfungsleistung ein.";
      return false;
    }

    if (!this.usedExams.includes(this.subModule.translations[0].exam)) {
      this.examClass = this.invalidClass;
      this.examTooltip = "Die Prüfungsleistung ist nicht in den verwendeten Prüfungsleistungen enthalten. Entweder gibt es einen Tippfehler, oder diese Prüfungsleistung ist neu.";
      return false;
    }

    return true;
  }


  searchSelfStudyHints(event: AutoCompleteCompleteEvent) {
    this.filteredSelfStudyHints = this.usedSelfStudyHints.filter(hint => hint.toLowerCase().includes(event.query.toLowerCase()));
  }

  searchType(event: AutoCompleteCompleteEvent) {
    this.filteredTypes = this.usedTypes.filter(type => type.toLowerCase().includes(event.query.toLowerCase()));
  }

  searchExam(event: AutoCompleteCompleteEvent) {
    this.filteredExams = this.usedExams.filter(exam => exam.toLowerCase().includes(event.query.toLowerCase()));
  }

  validateSemester(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.semesterClass === "") {
      return true;
    }

    this.semesterClass = "";
    this.semesterTooltip = "";

    const hasSemester = this.subModule.semester !== undefined;
    if (!hasSemester) {
      this.semesterClass = this.invalidClass;
      this.semesterTooltip = "Bitte geben Sie das Semester ein, in dem das Modul belegt werden sollte.";
      return false;
    }

    // string is either a number, or number-number
    const pattern = /^[0-9]+(-[0-9]+)?$/;
    if (!pattern.test(this.subModule.semester)) {
      this.semesterClass = this.invalidClass;
      this.semesterTooltip = "Das Semester sollte entweder eine Zahl oder eine Zahlenkombination (z.B. 1-2) sein.";
      return false;
    }

    return true;
  }

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

  protected validateWeeklyHours(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.weeklyHoursClass === "") {
      return true;
    }

    this.weeklyHoursClass = "";
    this.weeklyHoursTooltip = "";

    const hasWeeklyHours = this.subModule.weeklyHours !== undefined && this.subModule.weeklyHours > 0;

    if (!hasWeeklyHours) {
      this.weeklyHoursClass = this.invalidClass;
      this.weeklyHoursTooltip = "Bitte geben Sie eine gültige Anzahl an Wochenstunden ein (>0).";
      return false;
    }

    return true;
  }

  protected validateGroupSize(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.groupSizeClass === "") {
      return true;
    }

    this.groupSizeClass = "";
    this.groupSizeTooltip = "";

    const hasGroupSize = this.subModule.groupSize !== undefined && this.subModule.groupSize > 0;

    if (!hasGroupSize) {
      this.groupSizeClass = this.invalidClass;
      this.groupSizeTooltip = "Bitte geben Sie eine gültige Gruppengröße ein (>0).";
      return false;
    }

    return true;
  }

  protected validateSelfStudyHours(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.selfStudyHoursClass === "") {
      return true;
    }

    this.selfStudyHoursClass = "";
    this.selfStudyHoursTooltip = "";

    const hasSelfStudyHours = this.subModule.hoursSelf !== undefined && this.subModule.hoursSelf > 0;

    if (!hasSelfStudyHours) {
      this.selfStudyHoursClass = this.invalidClass;
      this.selfStudyHoursTooltip = "Bitte geben Sie eine gültige Anzahl an Stunden im Selbststudium ein (>0).";
      return false;
    }

    return true;
  }

  protected validatePresenceHours(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.presenceHoursClass === "") {
      return true;
    }

    this.presenceHoursClass = "";
    this.presenceHoursTooltip = "";

    const hasPresenceHours = this.subModule.hoursPresence !== undefined && this.subModule.hoursPresence > 0;

    if (!hasPresenceHours) {
      this.presenceHoursClass = this.invalidClass;
      this.presenceHoursTooltip = "Bitte geben Sie eine gültige Anzahl an Präsenzstunden ein (>0).";
      return false;
    }

    return true;
  }
}
