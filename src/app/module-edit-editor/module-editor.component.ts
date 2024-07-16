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

  availableSemester: any[] | undefined;
  requiredSoftSemester: any;
  requiredHardSemester: any;

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

    if(!this.validateCredits()){
      valid = false;
    }

    if(valid) {
      this.onModuleChange();
      this.nextCallback.emit();
    }

    return valid;
  }

  validateCredits(onlyIfInvalid: boolean = false): boolean {
    this.creditClass = "";
    this.creditTooltip = "";

    if (onlyIfInvalid && this.creditClass === "") {
      return true;
    }

    const hasCredits = this.module.credits !== undefined && this.module.credits > 0;

    if (!hasCredits) {
      this.creditClass = "ng-invalid ng-dirty";
      this.creditTooltip = "Bitte geben Sie eine gültige Anzahl an Credits ein (>0).";
      return false;
    }

    return true;
  }
}