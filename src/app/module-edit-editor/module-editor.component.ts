import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  ModuleDetail,
  ModuleDto, ModuleService,
  SubModule
} from "../../shared/module/module.service";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {AutoCompleteModule} from "primeng/autocomplete";
import {TextAutocompleteService} from "../../shared/text-autocomplete/text-autocomplete.service";
import {ButtonModule} from "primeng/button";
import {SelectButtonModule} from "primeng/selectbutton";
import {CheckboxModule} from "primeng/checkbox";
import {UserDto, UserService} from "../../shared/user/user.service";
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {NgIf} from "@angular/common";
import {ResponsibleAvatarComponent} from "../responsible-avatar/responsible-avatar.component";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MultiSelectChangeEvent, MultiSelectModule} from "primeng/multiselect";
import {LanguageService} from "../../shared/language/language.service";
import {SubmoduleService} from "../../shared/submodule/submodule.service";
import {firstValueFrom} from "rxjs";
import {StyleClassModule} from "primeng/styleclass";
import {ResponsibleDropdownComponent} from "../responsible-dropdown/responsible-dropdown.component";
import {TooltipModule} from "primeng/tooltip";
import {translate, TranslocoDirective} from "@jsverse/transloco";
import {InputGroupModule} from "primeng/inputgroup";
import {DialogModule} from "primeng/dialog";
import {RequirementDetailComponent} from "../requirement-detail/requirement-detail.component";
import {RequirementEditorComponent} from "../requirement-editor/requirement-editor.component";
import {CourseDto, CourseService} from "../../shared/course/course.service";
import {GroupDto, GroupService} from "../../shared/group/group.service";
import {activeTranslationIndex} from "../module-translator/module-translator.component";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-module-editor',
  standalone: true,
  imports: [
    InputNumberModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
    AutoCompleteModule,
    ButtonModule,
    SelectButtonModule,
    CheckboxModule,
    DropdownModule,
    NgIf,
    ResponsibleAvatarComponent,
    InputTextareaModule,
    MultiSelectModule,
    StyleClassModule,
    ResponsibleDropdownComponent,
    TooltipModule,
    TranslocoDirective,
    InputGroupModule,
    DialogModule,
    RequirementDetailComponent,
    RequirementEditorComponent,
    ConfirmPopupModule
  ],
  providers: [TextAutocompleteService, CourseService, ModuleService, ConfirmationService],
  templateUrl: './module-editor.component.html',
  styleUrl: './module-edit-editor.component.sass'
})
export class ModuleEditorComponent implements OnInit, OnChanges, OnDestroy {
  protected submodules: any[] = [];
  protected submodulesForDropdown: any[] = [];
  protected creditClass: string = "";
  protected validationResult: string = "";
  protected validationClass: string = "";

  availableSemester: any[] | undefined;
  requiredSoftSemester: any;
  requiredHardSemester: any;
  protected degrees: CourseDto[] = [];
  protected modules: ModuleDto[] = [];

  nameClass: string = '';
  subtitleClass: string = '';
  creditsClass: string = '';
  courseLengthClass: string = '';
  learningOutcomesClass: string = '';
  responsibleClass: string = '';
  abbreviationClass: string = '';
  hoursPresenceClass: string = '';
  hoursSelfClass: string = '';
  semesterClass: string = '';
  groupClass: string = '';


  nameTooltip: string = '';
  subtitleTooltip: string = '';
  creditsTooltip: string = '';
  courseLengthTooltip: string = '';
  learningOutcomesTooltip: string = '';
  responsibleTooltip: string = '';
  abbreviationTooltip: string = translate('abbreviationTooltip');
  hoursPresenceTooltip: string = '';
  hoursSelfTooltip: string = '';
  semesterTooltip: string = '';
  groupTooltip: string = translate('groupTooltip');

  invalidClass: string = 'ng-invalid ng-dirty';

  availableModules: ModuleDto[] | undefined;
  requiredSoftModules: any;
  requiredHardModules: number[] = [];

  @Input() nextCallback: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private languageService: LanguageService,
    private submoduleService: SubmoduleService,
    private moduleService: ModuleService,
    private degreeService: CourseService,
    private confirmationService: ConfirmationService,
    private groupService: GroupService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['module']) {
      console.log(changes['module']);
    }
  }

  private subscription: any;

  ngOnInit(): void {
    this.loadData();

    this.subscription = this.languageService.languageSubject.subscribe(() => {
      this.loadData()
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onModuleChange() {
    this.moduleChange.emit(this.module);
  }

  @Input() module!: ModuleDetail;
  @Output() moduleChange = new EventEmitter<any>();
  @Input() languageId!: number;

  protected users: UserDto[] = [];
  selectedSubmodules: any;
  electiveOptions: any[] | undefined;
  specializationOptions: any[] | undefined;
  creditTooltip: string | undefined;
  hardRequirementsPopupVisible: boolean = false;
  softRequirementsPopupVisible: boolean = false;
  currentLanguageId: number = 2;
  availableGroups: GroupDto[] | undefined;

  private setInitialResponsible(): void {
    if (this.module && this.module.responsible && this.users.length) {
      this.module.responsible = this.users.find(user => user.id === this.module.responsible.id) || this.module.responsible;
    }
  }

  private loadData() {
    this.availableSemester = [

      {label: '1. Semester', value: '1'},
      {label: '2. Semester', value: '2'},
      {label: '3. Semester', value: '3'},
      {label: '4. Semester', value: '4'},
      {label: '5. Semester', value: '5'},
      {label: '6. Semester', value: '6'},
      {label: '7. Semester', value: '7'}
    ];

    this.userService.getAll().subscribe(users => {
      this.users = users;

      this.setInitialResponsible();
      this.selectedSubmodules = this.module.subModules.map(submodule => submodule.id);

      this.submoduleService.getAll().subscribe(submodules => {
        this.submodules = submodules;

        const groupedSubmodules = submodules.reduce((acc, submodule) => {
          // Split submodule into parts
          const [abbr, rest, rest2] = submodule.abbreviation.split('-');

          // Initialize group if it doesn't exist
          if (!acc[abbr]) {
            acc[abbr] = [];
          }

          // Add rest part and id to the group
          acc[abbr].push({label: rest + '-' + rest2, value: submodule.id});

          return acc;
        }, {});

        this.submodulesForDropdown = Object.keys(groupedSubmodules).map(abbr => {
          return {
            label: abbr,
            value: abbr,
            items: groupedSubmodules[abbr].map((submodule: any) => ({
              label: submodule.label,
              value: submodule.value
            }))
          };
        });
      });
    });


    this.electiveOptions = [
      {label: translate("noElectiveModule"), value: false},
      {label: translate("electiveModule"), value: true}
    ];

    this.specializationOptions = [
      {label: translate("noSpecializationModule"), value: false},
      {label: translate("specializationModule"), value: true}
    ];

    this.degreeService.getAll().subscribe(degrees => {
      this.degrees = degrees;
    });

    this.moduleService.getAll(false, this.module.degreeProgramId).subscribe(modules => {
      this.modules = modules;
    });

    this.groupService.getAll(this.module.degreeProgramId).subscribe((groups: GroupDto[] | undefined) => {
      this.availableGroups = groups;
    });
  }

  selectedSubmodulesChange($event: MultiSelectChangeEvent) {
    const subModulesFromApi: SubModule[] = []
    this.selectedSubmodules.forEach(async (submodule: any) => {
      subModulesFromApi.push(await firstValueFrom(this.submoduleService.getOne(submodule)));
    });

    this.module.subModules = subModulesFromApi;
  }

  validate(): boolean {
    let valid = true;

    let nameValid = this.validateName();
    let subtitleValid = this.validateSubtitle();
    let courseLengthValid = this.validateCourseLength();
    let learningOutcomesValid = this.validateLearningOutcomes();
    let responsibleValid = this.validateResponsible();
    let abbreviationValid = this.validateAbbreviation();
    let hoursPresenceValid = this.validateHoursPresence();
    let hoursSelfValid = this.validateHoursSelf();
    let semesterValid = this.validateSemester();
    let creditsValid = this.validateCredits();
    let groupValid = this.validateGroup();


    valid = valid &&
      creditsValid &&
      nameValid &&
      subtitleValid &&
      courseLengthValid &&
      learningOutcomesValid &&
      responsibleValid &&
      abbreviationValid &&
      hoursPresenceValid &&
      hoursSelfValid &&
      groupValid &&
      semesterValid

    ;

    this.validationResult = valid ? translate("allValid") : translate("validationError");
    this.validationClass = valid ? "success" : "danger";

    if (valid) {
      //this.onModuleChange();
      //this.nextCallback.emit();
    }

    return valid;
  }

  proceed() {
    this.onModuleChange();
    this.nextCallback.emit();
  }

  validateCredits(onlyIfInvalid: boolean = false): boolean {
    this.creditClass = "";
    this.creditTooltip = "";

    if (onlyIfInvalid && this.creditClass === "") {
      return true;
    }

    const hasCredits = this.module.credits !== undefined && this.module.credits > 0;

    if (!hasCredits) {
      this.creditClass = this.invalidClass;
      this.creditTooltip = "Bitte geben Sie eine gültige Anzahl an Credits ein (>0).";
      return false;
    }

    const hoursPerCreditMax = 30;
    const hoursPerCreditMin = 25;
    const totalHours = this.module.hoursPresence + this.module.hoursSelf;
    const hoursPerCredit = totalHours / this.module.credits;

    if (hoursPerCredit < hoursPerCreditMin || hoursPerCredit > hoursPerCreditMax) {
      this.creditClass = this.invalidClass;
      this.creditTooltip = translate('creditsHoursPerCredit');

      this.hoursPresenceClass = this.invalidClass;
      this.hoursPresenceTooltip = translate('creditsHoursPerCredit');

      this.hoursSelfClass = this.invalidClass;
      this.hoursSelfTooltip = translate('creditsHoursPerCredit');
      return false;
    }

    return true;
  }

  protected validateName(onlyIfInvalid: boolean = false): boolean {
    this.nameClass = "";
    this.nameTooltip = "";

    if (onlyIfInvalid && this.nameClass === "") {
      return true;
    }

    const hasName = this.module.translations[0].name !== undefined && this.module.translations[0].name.length > 0;

    if (!hasName) {
      this.nameClass = this.invalidClass;
      this.nameTooltip = "Bitte geben Sie einen Namen ein.";
      return false;
    }

    return true;
  }

  protected validateSubtitle(onlyIfInvalid: boolean = false): boolean {
    this.subtitleClass = "";
    this.subtitleTooltip = "";

    if (onlyIfInvalid && this.subtitleClass === "") {
      return true;
    }

    const hasSubtitle = this.module.translations[0].subtitle !== undefined && this.module.translations[0].subtitle.length > 0;

    if (!hasSubtitle) {
      this.subtitleClass = this.invalidClass;
      this.subtitleTooltip = "Bitte geben Sie einen Untertitel ein.";
      return false;
    }

    return true;
  }

  protected validateCourseLength(onlyIfInvalid: boolean = false): boolean {
    this.courseLengthClass = "";
    this.courseLengthTooltip = "";

    if (onlyIfInvalid && this.courseLengthClass === "") {
      return true;
    }

    const hasCourseLength = this.module.courseLength !== undefined && this.module.courseLength > 0;

    if (!hasCourseLength) {
      this.courseLengthClass = this.invalidClass;
      this.courseLengthTooltip = "Bitte geben Sie eine gültige Kurslänge ein (>0).";
      return false;
    }

    return true;
  }

  protected validateLearningOutcomes(onlyIfInvalid: boolean = false): boolean {
    this.learningOutcomesClass = "";
    this.learningOutcomesTooltip = "";

    if (onlyIfInvalid && this.learningOutcomesClass === "") {
      return true;
    }

    const hasLearningOutcomes = this.module.translations[0].learningOutcomes !== undefined && this.module.translations[0].learningOutcomes.length > 0;

    if (!hasLearningOutcomes) {
      this.learningOutcomesClass = this.invalidClass;
      this.learningOutcomesTooltip = "Bitte geben Sie Lernergebnisse ein.";
      return false;
    }

    return true;
  }

  protected validateResponsible(onlyIfInvalid: boolean = false): boolean {
    this.responsibleClass = "";
    this.responsibleTooltip = "";

    if (onlyIfInvalid && this.responsibleClass === "") {
      return true;
    }

    const hasResponsible = this.module.responsibleId > 0;

    if (!hasResponsible) {
      this.responsibleClass = this.invalidClass;
      this.responsibleTooltip = "Bitte wählen Sie eine verantwortliche Person aus.";
      return false;
    }

    return true;
  }

  protected validateAbbreviation(onlyIfInvalid: boolean = false): boolean {
    this.abbreviationClass = "";
    this.abbreviationTooltip = translate('abbreviationTooltip');

    if (onlyIfInvalid && this.abbreviationClass === "") {
      return true;
    }

    const hasAbbreviation = this.module.abbreviation !== undefined && this.module.abbreviation.length > 0;

    if (!hasAbbreviation) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = "Bitte geben Sie eine Abkürzung ein.";
      return false;
    }

    const abbreviationRegex = /^[A-Z]{2,3}-[0-9]{3}$/;
    const abbreviationValid = abbreviationRegex.test(this.module.abbreviation);

    if (!abbreviationValid) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = "Bitte geben Sie eine gültige Abkürzung ein (z.B. 'BIN-123').";
      return false;
    }

    const courseAbbreviation = this.module.abbreviation.split("-")[0];
    const course = this.degrees.find(degree => degree.abbreviation === courseAbbreviation);
    if (!course) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = translate('abbreviationNotInUse');
      return false;
    }

    const duplicate = this.modules.find(module => module.abbreviation === this.module.abbreviation);
    if (duplicate && duplicate.id !== this.module.id) {
      this.abbreviationClass = this.invalidClass;
      this.abbreviationTooltip = translate('abbreviationDuplicate');
      return false;
    }

    return true;
  }

  protected validateHoursPresence(onlyIfInvalid: boolean = false): boolean {
    this.hoursPresenceClass = "";
    this.hoursPresenceTooltip = "";

    if (onlyIfInvalid && this.hoursPresenceClass === "") {
      return true;
    }

    const hasHoursPresence = this.module.hoursPresence !== undefined && this.module.hoursPresence > 0;

    if (!hasHoursPresence) {
      this.hoursPresenceClass = this.invalidClass;
      this.hoursPresenceTooltip = "Bitte geben Sie eine gültige Anzahl an Präsenzstunden ein (>0).";
      return false;
    }

    return true;
  }

  protected validateHoursSelf(onlyIfInvalid: boolean = false): boolean {
    this.hoursSelfClass = "";
    this.hoursSelfTooltip = "";

    if (onlyIfInvalid && this.hoursSelfClass === "") {
      return true;
    }

    const hasHoursSelf = this.module.hoursSelf !== undefined && this.module.hoursSelf > 0;

    if (!hasHoursSelf) {
      this.hoursSelfClass = this.invalidClass;
      this.hoursSelfTooltip = "Bitte geben Sie eine gültige Anzahl an Stunden im Selbststudium ein (>0).";
      return false;
    }

    return true;
  }

  validateSemester(onlyIfInvalid: boolean = false): boolean {
    this.semesterClass = "";
    this.semesterTooltip = "";

    if (onlyIfInvalid && this.semesterClass === "") {
      return true;
    }

    const hasSemester = this.module.semester !== undefined;
    if (!hasSemester) {
      this.semesterClass = this.invalidClass;
      this.semesterTooltip = translate('semesterMissing');
      return false;
    }

    const pattern = /^[0-9]+(-[0-9]+)?$/;
    if (!pattern.test(this.module.semester)) {
      this.semesterClass = this.invalidClass;
      this.semesterTooltip = translate('semesterPattern');
      return false;
    }

    return true;
  }

  validateGroup(onlyIfInvalid: boolean = false): boolean {
    this.groupClass = "";
    this.groupTooltip = translate('groupTooltip');

    if (onlyIfInvalid && this.groupClass === "") {
      return true;
    }

    const hasGroup = this.module.groupId !== undefined && this.module.groupId > 0;
    if (!hasGroup) {
      this.groupClass = this.invalidClass;
      this.groupTooltip = translate('groupMissing');
      return false;
    }

    return true;
  }

  selectedGroupChanged($event: DropdownChangeEvent) {
    this.module.groupId = $event.value;

    this.validateGroup(true);
  }

  getGroupDto(groupID: number): GroupDto | undefined {
    return this.availableGroups?.find(group => group.id === groupID);
  }

  getGroupLabel(group: GroupDto | undefined): string {
    return group?.translations?.at(activeTranslationIndex)?.name ?? "";
  }

  protected readonly activeTranslationIndex = activeTranslationIndex;

  useSubmoduleData($event: MouseEvent) {
    this.confirmationService.confirm({
      message: translate('getDataFromSubmodule'),
      target: $event.target as EventTarget,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.module.subModules.length > 0) {
          const submodule = this.module.subModules[0];
          this.submoduleService.get(submodule.id, this.languageService.languageCode).subscribe(submodule => {
            this.module.credits = submodule.credits;
            this.module.responsible = submodule.responsible;
            this.module.responsibleId = submodule.responsibleId;
            this.module.hoursPresence = submodule.hoursPresence;
            this.module.hoursSelf = submodule.hoursSelf;
            this.module.semester = submodule.semester;
            this.setInitialResponsible();
          });
        }
      }
    });
  }
}
