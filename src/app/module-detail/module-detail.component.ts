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

@Component({
  selector: 'app-module-detail',
  standalone: true,
  imports: [
    ButtonModule
  ],
  providers: [ModuleService],
  templateUrl: './module-detail.component.html',
  styleUrl: './module-detail.component.sass'
})
export class ModuleDetailComponent implements OnInit{
  moduleId: number | undefined;
  module: ModuleDetail | undefined;
  moduleText: ModuleTranslation | undefined;
  subModule: SubModule | undefined;
  subModuleText: SubModuleTranslation | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private moduleService: ModuleService) {
    this.moduleId = Number(this.getIdFromSegment("module"));
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

  // ToDo: Remove duplicate
  getIdFromSegment = (segment: string) => {
    const segments = this.router.url.split("/");
    const segmentIndex = segments.indexOf(segment);
    return segmentIndex !== -1 ? segments[segmentIndex + 1] : undefined;
  };

  async switchToEditMode() {
    await this.router.navigate(["edit"], {relativeTo: this.route});
  }
}

