import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ModuleDetail, ModuleTranslation, SubModule} from "../../shared/module/module.service";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";
import {AutoCompleteCompleteEvent, AutoCompleteModule} from "primeng/autocomplete";
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

@Component({
  selector: 'app-module-edit-editor',
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
    MultiSelectModule
  ],
  providers: [TextAutocompleteService],
  templateUrl: './module-edit-editor.component.html',
  styleUrl: './module-edit-editor.component.sass'
})
export class ModuleEditEditorComponent implements OnInit, OnChanges {
  protected submodules: any[] = [];
  protected submodulesForDropdown: any[] = [];

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

  @Input() module!: ModuleDetail;
  @Input() languageId!: number;
  @Input() moduleText!: ModuleTranslation;

  protected users: UserDto[] = [];
  selectedSubmodules: any;

  private setInitialResponsible(): void {
    if (this.module && this.module.responsible && this.users.length) {
      this.module.responsible = this.users.find(user => user.id === this.module.responsible.id) || this.module.responsible;
    }
  }

  private loadData() {
    this.userService.getAll().subscribe(users => {
        this.users = users;

        this.setInitialResponsible();

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
}
