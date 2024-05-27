import {Component, Input} from '@angular/core';
import {ModuleDetail, ModuleTranslation} from "../../shared/module/module.service";

@Component({
  selector: 'app-module-preview-modern',
  standalone: true,
  imports: [],
  templateUrl: './module-preview-modern.component.html',
  styleUrl: './module-preview-modern.component.sass'
})
export class ModulePreviewModernComponent {
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
