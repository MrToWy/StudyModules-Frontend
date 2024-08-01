import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {
  ModuleDetail,
  ModuleDto,
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
import {DropdownModule} from "primeng/dropdown";
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
    RequirementEditorComponent
  ],
  providers: [TextAutocompleteService],
  templateUrl: './module-editor.component.html',
  styleUrl: './module-edit-editor.component.sass'
})
export class ModuleEditorComponent implements OnInit, OnChanges {
  protected submodules: any[] = [];
  protected submodulesForDropdown: any[] = [];
  protected creditClass: string = "";
  protected validationResult: string = "";
  protected validationClass: string = "";

  availableSemester: any[] | undefined;
  requiredSoftSemester: any;
  requiredHardSemester: any;

  nameClass: string = '';
  subtitleClass: string = '';
  creditsClass: string = '';
  courseLengthClass: string = '';
  learningOutcomesClass: string = '';
  responsibleClass: string = '';

  nameTooltip: string = '';
  subtitleTooltip: string = '';
  creditsTooltip: string = '';
  courseLengthTooltip: string = '';
  learningOutcomesTooltip: string = '';
  responsibleTooltip: string = '';

  invalidClass: string = 'ng-invalid ng-dirty';

  availableModules: ModuleDto[] | undefined;
  requiredSoftModules: any;
  requiredHardModules: number[] = [];

  @Input() nextCallback: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private languageService: LanguageService,
    private submoduleService: SubmoduleService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['module']) {
      console.log(changes['module']);
    }
  }

  ngOnInit(): void {
    this.loadData();

    this.languageService.languageSubject.subscribe(() => {
      this.loadData()
    });
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

  private setInitialResponsible(): void {
    if (this.module && this.module.responsible && this.users.length) {
      this.module.responsible = this.users.find(user => user.id === this.module.responsible.id) || this.module.responsible;
    }
  }

  private loadData() {
    this.availableSemester = [

                    { label: '1. Semester', value: '1' },
                    { label: '2. Semester', value: '2' },
                    { label: '3. Semester', value: '3' },
                    { label: '4. Semester', value: '4' },
                    { label: '5. Semester', value: '5' },
                    { label: '6. Semester', value: '6' },
                    { label: '7. Semester', value: '7' }
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
                acc[abbr].push({ label: rest + '-' + rest2, value: submodule.id });

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
      { label: translate("noElectiveModule"), value: false },
      { label: translate("electiveModule"), value: true }
    ];

    this.specializationOptions = [
      { label: translate("noSpecializationModule"), value: false },
      { label: translate("specializationModule"), value: true }
    ];
  }

  selectedSubmodulesChange($event: MultiSelectChangeEvent) {
    console.log($event);
    console.log(this.selectedSubmodules);

    const subModulesFromApi: SubModule[] = []
    this.selectedSubmodules.forEach(async (submodule: any) => {
      subModulesFromApi.push(await firstValueFrom(this.submoduleService.getOne(submodule)));
    });

    this.module.subModules = subModulesFromApi;
  }

  validate(): boolean {
    let valid = true;

    let creditsValid = this.validateCredits();
    let nameValid = this.validateName();
    let subtitleValid = this.validateSubtitle();
    let courseLengthValid = this.validateCourseLength();
    let learningOutcomesValid = this.validateLearningOutcomes();
    let responsibleValid = this.validateResponsible();


    valid = valid &&
      creditsValid &&
      nameValid &&
      subtitleValid &&
      courseLengthValid &&
      learningOutcomesValid &&
      responsibleValid

    ;

    this.validationResult = valid ? translate("allValid") : translate("validationError");
    this.validationClass = valid ? "success" : "danger";

    if(valid) {
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



}
