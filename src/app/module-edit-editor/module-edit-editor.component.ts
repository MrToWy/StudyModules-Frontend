import {Component, Input} from '@angular/core';
import {ModuleDetail, ModuleTranslation} from "../../shared/module/module.service";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-module-edit-editor',
  standalone: true,
  imports: [
    InputNumberModule,
    FormsModule,
    PasswordModule,
    InputTextModule
  ],
  templateUrl: './module-edit-editor.component.html',
  styleUrl: './module-edit-editor.component.sass'
})
export class ModuleEditEditorComponent {
  @Input() module!: ModuleDetail;
  @Input() languageCode: string | undefined;
  @Input() languageId: number | undefined;
  @Input() moduleText!: ModuleTranslation;

}
