import {Component, Input} from '@angular/core';
import {ModuleDetail, ModuleTranslation} from "../../shared/module/module.service";

@Component({
  selector: 'app-module-preview',
  standalone: true,
  imports: [],
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
  protected moduleText: ModuleTranslation | undefined;
}
