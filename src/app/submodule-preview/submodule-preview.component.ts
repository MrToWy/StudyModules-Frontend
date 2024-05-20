import {Component, Input} from '@angular/core';
import {ModuleDetail, ModuleTranslation, SubModule, SubModuleTranslation} from "../../shared/module/module.service";

@Component({
  selector: 'app-submodule-preview',
  standalone: true,
  imports: [],
  templateUrl: './submodule-preview.component.html',
  styleUrl: './submodule-preview.component.sass'
})
export class SubmodulePreviewComponent {
  get module(): ModuleDetail | undefined {
    return this._module;
  }

  @Input()
  set module(value: ModuleDetail | undefined) {
    this._module = value;
    this.moduleText = value?.translations[0];
    this.subModule = value?.subModules[0];
    this.subModuleText = this.subModule?.translations[0];
  }

  private _module: ModuleDetail | undefined;
  protected moduleText: ModuleTranslation | undefined;
  protected subModule: SubModule | undefined;
  protected subModuleText: SubModuleTranslation | undefined;
}
