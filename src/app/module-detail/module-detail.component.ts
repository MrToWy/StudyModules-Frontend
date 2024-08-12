import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {
  ModuleDetail,
  ModuleService,
  ModuleTranslation,
  SubModule,
  SubModuleTranslation
} from "../../shared/module/module.service";
import {ModulePreviewComponent} from "../module-preview/module-preview.component";
import {FormsModule} from "@angular/forms";
import {SubmodulePreviewComponent} from "../submodule-preview/submodule-preview.component";
import {UrlSegmentService} from "../../shared/url/url-segment.service";
import {AuthService} from "../../shared/auth/auth.service";
import {NgIf} from "@angular/common";
import {ModulePreviewModernComponent} from "../module-preview-modern/module-preview-modern.component";
import {CardModule} from "primeng/card";
import {PanelModule} from "primeng/panel";
import {AvatarModule} from "primeng/avatar";
import {TranslocoDirective} from "@jsverse/transloco";
import {LanguageService} from "../../shared/language/language.service";

@Component({
  selector: 'app-module-detail',
  standalone: true,
    imports: [
        ButtonModule,
        ModulePreviewComponent,
        FormsModule,
        SubmodulePreviewComponent,
        NgIf,
        ModulePreviewModernComponent,
        CardModule,
        PanelModule,
        AvatarModule,
        TranslocoDirective
    ],
  providers: [ModuleService, UrlSegmentService, AuthService],
  templateUrl: './module-detail.component.html',
  styleUrl: './module-detail.component.sass'
})
export class ModuleDetailComponent implements OnInit, OnDestroy{
  moduleId: number | undefined;
  module: ModuleDetail | undefined;
  moduleText: ModuleTranslation | undefined;
  subModule: SubModule | undefined;
  subModuleText: SubModuleTranslation | undefined;

  constructor(

    private moduleService: ModuleService,
    private urlSegmentService: UrlSegmentService,
    protected authService: AuthService,
    private languageService: LanguageService
  ) {
    this.moduleId = Number(urlSegmentService.getIdFromSegment("module"));
  }

  private subscription: any;

  ngOnInit(): void {
   this.loadData();

   this.subscription = this.languageService.languageSubject.subscribe(() => {
      this.loadData();
    });
   }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

  private loadData(){
     if (this.moduleId) {
      this.moduleService.get(this.moduleId).subscribe((module) => {
        this.module = module;
        this.moduleText = module.translations[0];
        this.subModule = module.subModules[0];
        this.subModuleText = module.subModules[0].translations[0];
      });
    }
  }
}

