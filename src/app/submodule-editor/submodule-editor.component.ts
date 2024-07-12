import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../../shared/user/user.service";
import {LanguageService} from "../../shared/language/language.service";
import {SubModuleDetail, SubmoduleService} from "../../shared/submodule/submodule.service";
import {ModuleDetail, ModuleTranslation, SubModuleTranslation} from "../../shared/module/module.service";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {TranslocoDirective} from "@jsverse/transloco";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-submodule-editor',
  standalone: true,
  imports: [
    InputNumberModule,
    FormsModule,
    TranslocoDirective,
    InputTextModule
  ],
  templateUrl: './submodule-editor.component.html',
  styleUrl: './submodule-editor.component.sass'
})
export class SubmoduleEditorComponent implements OnInit{

@Input() nextCallback: EventEmitter<void> = new EventEmitter<void>();
 @Input() subModule!: SubModuleDetail;
  @Output() subModuleChange = new EventEmitter<any>();
  @Input() languageId!: number;
  @Input() subModuleText!: SubModuleTranslation;

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

  }
}
