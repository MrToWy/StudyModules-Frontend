import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserDto, UserService} from "../../shared/user/user.service";
import {LanguageService} from "../../shared/language/language.service";
import {SubModuleDetail, SubmoduleService} from "../../shared/submodule/submodule.service";
import {ModuleDetail, ModuleTranslation, SubModuleTranslation} from "../../shared/module/module.service";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {TooltipModule} from "primeng/tooltip";
import {TranslocoDirective} from "@jsverse/transloco";
import {InputTextModule} from "primeng/inputtext";
import {ResponsibleDropdownComponent} from "../responsible-dropdown/responsible-dropdown.component";
import {InputTextareaModule} from "primeng/inputtextarea";

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
    InputTextareaModule
  ],
  templateUrl: './submodule-editor.component.html',
  styleUrl: './submodule-editor.component.sass'
})
export class SubmoduleEditorComponent implements OnInit {

  @Input() nextCallback: EventEmitter<void> = new EventEmitter<void>();
  @Input() subModule!: SubModuleDetail;
  @Output() subModuleChange = new EventEmitter<any>();
  @Input() languageId!: number;
  @Input() subModuleText!: SubModuleTranslation;

  protected users: UserDto[] = [];

  creditTooltip: string | undefined;
  protected creditClass: string = "";


  constructor(
    private userService: UserService,
    private languageService: LanguageService
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

  }

  private setInitialResponsible(): void {
    if (this.subModule && this.subModule.responsible && this.users.length) {
      this.subModule.responsible = this.users.find(user => user.id === this.subModule.responsible.id) || this.subModule.responsible;
    }
  }

  validate(): boolean {
    let valid = true;

    if (!this.validateCredits()) {
      valid = false;
    }

    if (valid) {
      this.onSubModuleChange();
      this.nextCallback.emit();
    }

    return valid;
  }

  // ToDo: Refactor duplicate
  validateCredits(onlyIfInvalid: boolean = false): boolean {
    this.creditClass = "";
    this.creditTooltip = "";

    if (onlyIfInvalid && this.creditClass === "") {
      return true;
    }

    const hasCredits = this.subModule.credits !== undefined && this.subModule.credits > 0;

    if (!hasCredits) {
      this.creditClass = "ng-invalid ng-dirty";
      this.creditTooltip = "Bitte geben Sie eine gültige Anzahl an Credits ein (>0).";
      return false;
    }

    return true;
  }
}
