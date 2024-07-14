import {Component, Input} from '@angular/core';
import {ModuleDetail} from "../../shared/module/module.service";
import {NgForOf, NgIf} from "@angular/common";
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule} from "@angular/forms";
import {translate, TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'app-module-preview',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        SelectButtonModule,
        FormsModule,
        TranslocoDirective
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
  }

  private _module: ModuleDetail | undefined;
  protected readonly translate = translate;
}
