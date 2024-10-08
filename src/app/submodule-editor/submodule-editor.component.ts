import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UserDto, UserService} from "../../shared/user/user.service";
import {LanguageService} from "../../shared/language/language.service";
import {SubModuleDetail, SubmoduleService} from "../../shared/submodule/submodule.service";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {TooltipModule} from "primeng/tooltip";
import {translate, TranslocoDirective} from "@jsverse/transloco";
import {InputTextModule} from "primeng/inputtext";
import {ResponsibleDropdownComponent} from "../responsible-dropdown/responsible-dropdown.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputMaskModule} from "primeng/inputmask";
import {CourseDto, CourseService} from "../../shared/course/course.service";
import {ButtonModule} from "primeng/button";
import {TextAutocompleteService} from "../../shared/text-autocomplete/text-autocomplete.service";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
import {RequirementEditorComponent} from "../requirement-editor/requirement-editor.component";
import {NgIf} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {activeTranslationIndex} from "../module-translator/module-translator.component";

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
    AutoCompleteModule,
    RequirementEditorComponent,
    NgIf,
    DropdownModule
  ],
  providers: [SubmoduleService, UserService, CourseService],
  templateUrl: './submodule-editor.component.html',
  styleUrl: './submodule-editor.component.sass'
})
export class SubmoduleEditorComponent implements OnInit, OnDestroy {

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
  protected usedTypes: string[] = [];
  protected filteredTypes: string[] = [];
  protected usedExams: string[] = [];
  protected filteredExams: string[] = [];

  creditTooltip: string | undefined;
  protected creditClass: string = "";
  abbreviationTooltip: string = translate("abbreviationTooltipSubmodule");
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
  learningOutcomesTooltip: string | undefined;
  protected learningOutcomesClass: string = "";
  contentTooltip: string | undefined;
  protected contentClass: string = "";
  presenceRequirementsTooltip: string | undefined;
  protected presenceRequirementsClass: string = "";
  selfStudyRequirementsTooltip: string | undefined;
  protected selfStudyRequirementsClass: string = "";
  literatureTooltip: string | undefined;
  protected literatureClass: string = "";
  responsibleTooltip: string | undefined;
  protected responsibleClass: string = "";
  protected validationResult = "";
  protected validationClass = "primary";
  protected degreeProgramTooltip: string | undefined;
  protected degreeProgramClass: string = "";

  selectedDegreeProgram: CourseDto | undefined;
  private invalidClass = "ng-invalid ng-dirty";


  constructor(
    private userService: UserService,
    private languageService: LanguageService,
    private degreeService: CourseService,
    private submoduleService: SubmoduleService,
    private autocompleteService: TextAutocompleteService
  ) {
  }

  private subscription: any;

  ngOnInit(): void {
    this.loadData();

    this.subscription = this.languageService.languageSubject.subscribe(() => {
      this.loadData()
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

      if (this.subModule.degreeProgramId !== undefined || this.subModule.degreeProgramId == 0) {
        this.selectedDegreeProgram = this.degrees[0];
        this.subModule.degreeProgramId = this.selectedDegreeProgram.id;

        this.selectedDegreeProgramChanged();
      }
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
    let isSemesterValid = this.validateSemester();
    let isTypeValid = this.validateType();
    let isExamValid = this.validateExam();
    let isWeeklyHoursValid = this.validateWeeklyHours();
    let isGroupSizeValid = this.validateGroupSize();
    let isSelfStudyHoursValid = this.validateSelfStudyHours();
    let isPresenceHoursValid = this.validatePresenceHours();
    let isLearningOutcomesValid = this.validateLearningOutcomes();
    let isContentValid = this.validateContent();
    let isPresenceRequirementsValid = this.validatePresenceRequirements();
    let isSelfStudyRequirementsValid = this.validateSelfStudyRequirements();
    let isLiteratureValid = this.validateLiterature();
    let isResponsibleValid = this.validateResponsible();
    let isDegreeProgramValid = this.validateDegreeProgram();
    let isCreditsValid = this.validateCredits();

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
      isLearningOutcomesValid &&
      isContentValid &&
      isPresenceRequirementsValid &&
      isSelfStudyRequirementsValid &&
      isLiteratureValid &&
      isResponsibleValid &&
      isDegreeProgramValid &&
      isCreditsValid;

    this.validationResult = valid ? translate("allValid") : translate("validationError");
    this.validationClass = valid ? "success" : "danger";

    return valid;
  }

  proceed() {
    this.onSubModuleChange();
    this.nextCallback.emit();

    // scroll to top
    window.scrollTo(0, 0);
  }

  validateAbbreviation(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.abbreviationClass === "") {
      return true;
    }

    this.abbreviationClass = "";
    this.abbreviationTooltip = translate("abbreviationTooltipSubmodule");

    const hasAbbreviation = this.subModule.abbreviation !== undefined && this.subModule.abbreviation.length > 0;

    if (!hasAbbreviation) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = translate('abbreviationMissing');
      return false;
    }

    const pattern = /^[A-Z]{3}-[0-9]{3}-[0-9]{2}$/;
    if (!pattern.test(this.subModule.abbreviation)) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = translate('abbreviationPattern');
      return false;
    }

    const courseAbbreviation = this.subModule.abbreviation.split("-")[0];
    const course = this.degrees.find(degree => degree.abbreviation === courseAbbreviation);
    if (!course) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = translate('abbreviationNotInUse');
      return false;
    }

    const duplicate = this.submodules.find(submodule => submodule.abbreviation === this.subModule.abbreviation);
    if (duplicate && duplicate.id !== this.subModule.id) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = translate('abbreviationDuplicate');
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

    const hasName = this.subModule?.translations[activeTranslationIndex].name !== undefined && this.subModule.translations[activeTranslationIndex].name.length > 0;

    if (!hasName) {
      this.nameClass = this.invalidClass;
      this.nameTooltip = translate('nameMissing');
      return false;
    }

    return true;
  }

  validateSubtitle(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.subtitleClass === "") {
      return true;
    }

    this.subtitleClass = "";
    this.subtitleTooltip = "";

    const hasSubtitle = this.subModule?.translations[activeTranslationIndex].subtitle !== undefined
      && this.subModule.translations[activeTranslationIndex].subtitle.length > 0;

    if (!hasSubtitle) {
      this.subtitleClass = this.invalidClass;
      this.subtitleTooltip = translate('subtitleMissing');
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

    const hasLanguage = this.subModule.translations[activeTranslationIndex].spokenlanguage !== undefined
      && this.subModule.translations[activeTranslationIndex].spokenlanguage.length > 0;

    if (!hasLanguage) {
      this.languageClass = this.invalidClass;
      this.languageTooltip = translate('languageMissing');
      return false;
    }

    if (!this.usedLanguages.includes(this.subModule.translations[activeTranslationIndex].spokenlanguage)) {
      this.languageClass = this.invalidClass;
      this.languageTooltip = translate('languageNotInUse');
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

    const hasSelfStudyHints = this.subModule.translations[activeTranslationIndex].selfStudyHints !== undefined
      && this.subModule.translations[activeTranslationIndex].selfStudyHints.length > 0;

    if (!hasSelfStudyHints) {
      this.selfStudyHintsClass = this.invalidClass;
      this.selfStudyHintsTooltip = translate('selfStudyHintsMissing');
      return false;
    }

    if (!this.usedSelfStudyHints.includes(this.subModule.translations[activeTranslationIndex].selfStudyHints)) {
      this.selfStudyHintsClass = this.invalidClass;
      this.selfStudyHintsTooltip = translate('selfStudyHintsNotInUse');
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

    const hasType = this.subModule.translations[activeTranslationIndex].type !== undefined
      && this.subModule.translations[activeTranslationIndex].type.length > 0;

    if (!hasType) {
      this.typeClass = this.invalidClass;
      this.typeTooltip = translate('typeMissing');
      return false;
    }

    if (!this.usedTypes.includes(this.subModule.translations[activeTranslationIndex].type)) {
      this.typeClass = this.invalidClass;
      this.typeTooltip = translate('typeNotInUse');
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

    const hasExam = this.subModule.translations[activeTranslationIndex].exam !== undefined
      && this.subModule.translations[activeTranslationIndex].exam.length > 0;

    if (!hasExam) {
      this.examClass = this.invalidClass;
      this.examTooltip = translate('examMissing');
      return false;
    }

    if (!this.usedExams.includes(this.subModule.translations[activeTranslationIndex].exam)) {
      this.examClass = this.invalidClass;
      this.examTooltip = translate('examNotInUse');
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
      this.semesterTooltip = translate('semesterMissing');
      return false;
    }

    const pattern = /^[1-9]+(-[2-9]+)?$/;
    if (!pattern.test(this.subModule.semester)) {
      this.semesterClass = this.invalidClass;
      this.semesterTooltip = translate('semesterPattern');
      return false;
    }

    // if there is a dash, check if the second number is greater than the first
    if (this.subModule.semester.includes("-")) {
      const semesters = this.subModule.semester.split("-");
      if (parseInt(semesters[0]) >= parseInt(semesters[1])) {
        this.semesterClass = this.invalidClass;
        this.semesterTooltip = translate('semesterOrder');
        return false;
      }
    }

    return true;
  }

  validateResponsible(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.responsibleClass === "") {
      return true;
    }

    this.responsibleClass = "";
    this.responsibleTooltip = "";

    const hasResponsible = this.subModule.responsibleId !== undefined;
    if (!hasResponsible) {
      this.responsibleClass = this.invalidClass;
      this.responsibleTooltip = translate('responsibleMissing');
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
      this.creditTooltip = translate('creditsMissing');
      return false;
    }

    const hoursPerCreditMax = 30;
    const hoursPerCreditMin = 25;
    const totalHours = this.subModule.hoursPresence + this.subModule.hoursSelf;
    const hoursPerCredit = totalHours / this.subModule.credits;

    if (hoursPerCredit < hoursPerCreditMin || hoursPerCredit > hoursPerCreditMax) {
      this.creditClass = this.invalidClass;
      this.creditTooltip = translate('creditsHoursPerCredit');

      this.presenceHoursClass = this.invalidClass;
      this.presenceHoursTooltip = translate('creditsHoursPerCredit');

      this.selfStudyHoursClass = this.invalidClass;
      this.selfStudyHoursTooltip = translate('creditsHoursPerCredit');
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
      this.weeklyHoursTooltip = translate('weeklyHoursMissing');
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
      this.groupSizeTooltip = translate('groupSizeMissing');
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
      this.selfStudyHoursTooltip = translate('selfStudyHoursMissing');
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
      this.presenceHoursTooltip = translate('presenceHoursMissing');
      return false;
    }

    return true;
  }

  validateLearningOutcomes(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.learningOutcomesClass === "") {
      return true;
    }

    this.learningOutcomesClass = "";
    this.learningOutcomesTooltip = "";

    const hasLearningOutcomes = this.subModule.translations[activeTranslationIndex].learningOutcomes !== undefined
      && this.subModule.translations[activeTranslationIndex].learningOutcomes.length > 0;

    if (!hasLearningOutcomes) {
      this.learningOutcomesClass = this.invalidClass;
      this.learningOutcomesTooltip = translate('learningOutcomesMissing');
      return false;
    }

    return true;
  }

  validateContent(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.contentClass === "") {
      return true;
    }

    this.contentClass = "";
    this.contentTooltip = "";

    const hasContent = this.subModule.translations[activeTranslationIndex].content !== undefined
      && this.subModule.translations[activeTranslationIndex].content.length > 0;

    if (!hasContent) {
      this.contentClass = this.invalidClass;
      this.contentTooltip = translate('contentMissing');
      return false;
    }

    return true;
  }

  validatePresenceRequirements(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.presenceRequirementsClass === "") {
      return true;
    }

    this.presenceRequirementsClass = "";
    this.presenceRequirementsTooltip = "";

    const hasPresenceRequirements = this.subModule.translations[activeTranslationIndex].presenceRequirements !== undefined
      && this.subModule.translations[activeTranslationIndex].presenceRequirements.length > 0;

    if (!hasPresenceRequirements) {
      this.presenceRequirementsClass = this.invalidClass;
      this.presenceRequirementsTooltip = translate('presenceRequirementsMissing');
      return false;
    }

    return true;
  }

  validateSelfStudyRequirements(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.selfStudyRequirementsClass === "") {
      return true;
    }

    this.selfStudyRequirementsClass = "";
    this.selfStudyRequirementsTooltip = "";

    const hasSelfStudyRequirements = this.subModule.translations[activeTranslationIndex].selfStudyRequirements !== undefined
      && this.subModule.translations[activeTranslationIndex].selfStudyRequirements.length > 0;

    if (!hasSelfStudyRequirements) {
      this.selfStudyRequirementsClass = this.invalidClass;
      this.selfStudyRequirementsTooltip = translate('selfStudyRequirementsMissing');
      return false;
    }

    return true;
  }

  validateLiterature(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.literatureClass === "") {
      return true;
    }

    this.literatureClass = "";
    this.literatureTooltip = "";

    const hasLiterature = this.subModule.translations[activeTranslationIndex].literature !== undefined
      && this.subModule.translations[activeTranslationIndex].literature.length > 0;

    if (!hasLiterature) {
      this.literatureClass = this.invalidClass;
      this.literatureTooltip = translate('literatureMissing');
      return false;
    }

    return true;
  }

  validateDegreeProgram(onlyIfInvalid: boolean = false): boolean {
    if (onlyIfInvalid && this.degreeProgramClass === "") {
      return true;
    }

    this.degreeProgramClass = "";
    this.degreeProgramTooltip = "";

    const hasDegreeProgram = this.subModule.degreeProgramId !== undefined && this.subModule.degreeProgramId > 0;

    if (!hasDegreeProgram) {
      this.degreeProgramClass = this.invalidClass;
      this.degreeProgramTooltip = translate('degreeProgramMissing');
      return false;
    }

    return true;
  }

  selectedDegreeProgramChanged() {
    this.subModule.degreeProgramId = this.selectedDegreeProgram?.id || 0;
    this.validateDegreeProgram(true);

    // if subModule.abbreviation is empty or only XYZ-
    if (this.subModule.abbreviation === undefined || this.subModule.abbreviation.length < 5) {
      this.subModule.abbreviation = this.selectedDegreeProgram?.abbreviation + "-" || "";
    }
  }

  protected readonly JSON = JSON;
  protected readonly activeTranslationIndex = activeTranslationIndex;
}
