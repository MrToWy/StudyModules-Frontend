import {Component, OnInit} from '@angular/core';
import {ModulePreviewComponent} from "../module-preview/module-preview.component";
import {ModuleDetail, ModuleService} from "../../shared/module/module.service";
import {UrlSegmentService} from "../../shared/url/url-segment.service";
import {SubmodulePreviewComponent} from "../submodule-preview/submodule-preview.component";
import {TabViewModule} from "primeng/tabview";
import {LanguageDto, LanguageService} from "../../shared/language/language.service";
import {NgForOf, NgIf} from "@angular/common";
import {ModuleEditEditorComponent} from "../module-edit-editor/module-edit-editor.component";
import {ButtonModule} from "primeng/button";
import {ModuleTranslatorComponent} from "../module-translator/module-translator.component";

@Component({
  selector: 'app-module-edit',
  standalone: true,
  imports: [
    ModulePreviewComponent,
    SubmodulePreviewComponent,
    TabViewModule,
    NgForOf,
    ModuleEditEditorComponent,
    ButtonModule,
    ModuleTranslatorComponent,
    NgIf
  ],
  providers: [
    ModuleService,
    UrlSegmentService
  ],
  templateUrl: './module-edit.component.html',
  styleUrl: './module-edit.component.sass'
})
export class ModuleEditComponent implements OnInit {
  constructor(
    private moduleService: ModuleService,
    private urlSegmentService: UrlSegmentService,
    private languageService: LanguageService
  ) {
  }

  ngOnInit(): void {
    const moduleId = Number(this.urlSegmentService.getIdFromSegment("module"));
    if (moduleId) {
      this.moduleService.get(moduleId).subscribe((module) => {
        this.currentModule = module;
      });
    }

    this.languageService.getLanguages().subscribe((languages) => {
      this.availableLanguages = languages;
    });
  }

  availableLanguages: LanguageDto[] | undefined;
  currentModule!: ModuleDetail;

  saveModule() {
    console.log(this.currentModule);
  }
}
