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

@Component({
  selector: 'app-module-detail',
  standalone: true,
  imports: [
    ButtonModule,
    ModulePreviewComponent,
    FormsModule,
    SubmodulePreviewComponent
  ],
  providers: [ModuleService, UrlSegmentService],
  templateUrl: './module-detail.component.html',
  styleUrl: './module-detail.component.sass'
})
export class ModuleDetailComponent implements OnInit{
  moduleId: number | undefined;
  module: ModuleDetail | undefined;
  moduleText: ModuleTranslation | undefined;
  subModule: SubModule | undefined;
  subModuleText: SubModuleTranslation | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private moduleService: ModuleService, private urlSegmentService: UrlSegmentService) {
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
}

