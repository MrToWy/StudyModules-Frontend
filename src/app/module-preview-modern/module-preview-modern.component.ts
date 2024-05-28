import {Component, Input} from '@angular/core';
import {ModuleDetail, ModuleTranslation} from "../../shared/module/module.service";
import {AvatarModule} from "primeng/avatar";
import {CardModule} from "primeng/card";
import {NgIf} from "@angular/common";
import {InfoCardComponent} from "../cards/info-card/info-card.component";
import {StatsCardComponent} from "../cards/stats-card/stats-card.component";
import {TextCardComponent} from "../cards/text-card/text-card.component";
import {SplitTextCardComponent} from "../cards/split-text-card/split-text-card.component";
import {TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'app-module-preview-modern',
  standalone: true,
    imports: [
        AvatarModule,
        CardModule,
        NgIf,
        InfoCardComponent,
        StatsCardComponent,
        TextCardComponent,
        SplitTextCardComponent,
        TranslocoDirective
    ],
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
