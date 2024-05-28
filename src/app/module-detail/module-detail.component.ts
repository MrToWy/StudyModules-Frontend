import {Component, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ActivatedRoute, Router} from "@angular/router";
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
export class ModuleDetailComponent implements OnInit{
  moduleId: number | undefined;
  module: ModuleDetail | undefined;
  moduleText: ModuleTranslation | undefined;
  subModule: SubModule | undefined;
  subModuleText: SubModuleTranslation | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private moduleService: ModuleService,
    private urlSegmentService: UrlSegmentService,
    protected authService: AuthService
  ) {
    this.moduleId = Number(urlSegmentService.getIdFromSegment("module"));
  }

  ngOnInit(): void {
    if (this.moduleId) {
      this.moduleService.get(this.moduleId).subscribe((module) => {
        this.module = module;
        this.moduleText = module.translations[0];
        this.subModule = module.subModules[0];
        this.subModuleText = module.subModules[0].translations[0];
      });
    }
  }

  async switchToEditMode() {
    await this.router.navigate(["edit"], {relativeTo: this.route});
  }

  async showChanges() {
    await this.router.navigate(["changes"], {relativeTo: this.route});
  }
}

