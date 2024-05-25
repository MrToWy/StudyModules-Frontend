import {Component, Input, OnInit} from '@angular/core';
import {ModuleEditEditorComponent} from "../module-edit-editor/module-edit-editor.component";
import {ModulePreviewComponent} from "../module-preview/module-preview.component";
import {ModuleDetail, ModuleService, ModuleTranslation} from "../../shared/module/module.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-module-translator',
  standalone: true,
    imports: [
        ModuleEditEditorComponent,
        ModulePreviewComponent
    ],
  providers: [
    ModuleService
  ],
  templateUrl: './module-translator.component.html',
  styleUrl: './module-translator.component.sass'
})
export class ModuleTranslatorComponent implements OnInit{
  public moduleText: ModuleTranslation;

  constructor(private moduleService: ModuleService) {
    // initialize moduleText to prevent error
    this.moduleText = {
      exam: "", id: 0, learningOutcomes: "", moduleId: 0, niveau: "", subtitle: "", type: "",
      languageId: 0,
      name: "",
      description: ""
    };
  }

  ngOnInit(): void {
    if (this.languageAbbreviation) {
      this.getModuleText().then((moduleText) => {
        this.moduleText = moduleText;
      });
    }
    }

  @Input()
  currentModule!: ModuleDetail;

  @Input()
  languageAbbreviation: string | undefined;

  @Input()
  languageId: number | undefined;

  async getModuleText(): Promise<ModuleTranslation> {
    // try get translation from this.module
    if (this.currentModule.translations) {
      const moduleTranslation= this.currentModule.translations.find((translation) => translation.languageId === this.languageId);
      if (moduleTranslation) {
        return moduleTranslation;
      }
    }

    const moduleDetail = await firstValueFrom(this.moduleService.get(this.currentModule.id, this.languageAbbreviation));

    // attach new translation to this.module
    this.currentModule.translations.push(moduleDetail.translations[0]);

    return moduleDetail.translations[0];
  }
}
