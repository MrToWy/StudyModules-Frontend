import {Component, Input} from '@angular/core';
import {
  ModuleDetail,
  ModuleService,
  ModuleTranslation,
  SubModule,
  SubModuleTranslation
} from "../../shared/module/module.service";
import {AvatarModule} from "primeng/avatar";
import {CardModule} from "primeng/card";
import {NgIf} from "@angular/common";
import {InfoCardComponent} from "../cards/info-card/info-card.component";
import {StatsCardComponent} from "../cards/stats-card/stats-card.component";
import {TextCardComponent} from "../cards/text-card/text-card.component";
import {SplitTextCardComponent} from "../cards/split-text-card/split-text-card.component";
import {translate, TranslocoDirective} from "@jsverse/transloco";
import {ButtonModule} from "primeng/button";
import {AuthService} from "../../shared/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {activeTranslationIndex} from "../module-translator/module-translator.component";
import {TooltipModule} from "primeng/tooltip";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ConfirmationService} from "primeng/api";

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
    TranslocoDirective,
    ButtonModule,
    TooltipModule,
    ConfirmPopupModule
  ],
  providers: [AuthService, ConfirmationService],
  templateUrl: './module-preview-modern.component.html',
  styleUrl: './module-preview-modern.component.sass'
})
export class ModulePreviewModernComponent {

  constructor(protected authService: AuthService,
              private router: Router,
              private confirmationService: ConfirmationService,
              private moduleService: ModuleService,
              private route: ActivatedRoute,
  ) {
  }

  get module(): ModuleDetail | undefined {
    return this._module;
  }

  addPointsToNumbers(input: string): string {
    if (!input) {
      return translate("noRecommendation");
    }
    return input.replace(/(\d+)(?=-?\d*)/g, '$1.');
  }

  @Input()
  set module(value: ModuleDetail | undefined) {
    this._module = value;
    this.moduleText = value?.translations[0];
    this.subModule = value?.subModules[0];
    this.subModuleText = this.subModule?.translations[0];
  }

  private _module: ModuleDetail | undefined;
  moduleText: ModuleTranslation | undefined;
  subModule: SubModule | undefined;
  subModuleText: SubModuleTranslation | undefined;


  async switchToEditMode() {
    await this.router.navigate(["edit"], {relativeTo: this.route});
  }

  async showChanges() {
    await this.router.navigate(["changes"], {relativeTo: this.route});
  }

  protected readonly activeTranslationIndex = activeTranslationIndex;

  delete($event: MouseEvent) {
    this.confirmationService.confirm({
      message: translate('preview.deleteModule'),
      target: $event.target as EventTarget,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.moduleService.delete(this.module!.id).subscribe(async () => {
          window.history.back();
        });
      }
    });
  }
}
