import {Component, Input} from '@angular/core';
import {ModuleDetail, ModuleTranslation} from "../../shared/module/module.service";
import {NgForOf, NgIf} from "@angular/common";
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-module-preview',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SelectButtonModule,
    FormsModule
  ],
  templateUrl: './module-preview.component.html',
  styleUrl: './module-preview.component.sass'
})
export class ModulePreviewComponent {
  get module(): ModuleDetail | undefined {
    return this._module;
  }

  @Input()
  set module(value: ModuleDetail | undefined) {
    this._module = value;
    this.moduleText = value?.translations[0];
  }

  private _module: ModuleDetail | undefined;
  @Input() moduleText: ModuleTranslation | undefined;
}
