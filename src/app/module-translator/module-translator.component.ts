import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Input()
  nextCallback: EventEmitter<void> = new EventEmitter<void>();

  constructor(private moduleService: ModuleService) {
    // initialize moduleText to prevent error
    this.moduleText = {
      exam: "", id: 0, learningOutcomes: "", moduleId: 0, subtitle: "",
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

  @Input() currentModule: any;
  @Output() currentModuleChange = new EventEmitter<any>();
  onModuleChange(module: ModuleDetail) {
    this.currentModuleChange.emit(module);
  }


  @Input()
  languageAbbreviation: string | undefined;

  @Input()
  languageId: number | undefined;

  async getModuleText(): Promise<ModuleTranslation> {
    // try get translation from this.module
    if (this.currentModule.translations) {
      const moduleTranslation= this.currentModule.translations.find((translation: { languageId: number | undefined; }) => translation.languageId === this.languageId);
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
