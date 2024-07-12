import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModuleEditEditorComponent} from "../module-edit-editor/module-edit-editor.component";
import {ModulePreviewComponent} from "../module-preview/module-preview.component";
import {SubmodulePreviewComponent} from "../submodule-preview/submodule-preview.component";
import {ModuleDetail, ModuleService, ModuleTranslation, SubModuleTranslation} from "../../shared/module/module.service";
import {firstValueFrom} from "rxjs";
import {SubModuleDetail, SubmoduleService} from "../../shared/submodule/submodule.service";
import {SubmoduleEditorComponent} from "../submodule-editor/submodule-editor.component";

@Component({
  selector: 'app-submodule-translator',
  standalone: true,
  imports: [
    ModuleEditEditorComponent,
    ModulePreviewComponent,
    SubmodulePreviewComponent,
    SubmoduleEditorComponent
  ],
  templateUrl: './submodule-translator.component.html',
  styleUrl: './submodule-translator.component.sass'
})
export class SubmoduleTranslatorComponent {
  public submoduleText: SubModuleTranslation;

  @Input()
  nextCallback: EventEmitter<void> = new EventEmitter<void>();

  constructor(private submoduleService: SubmoduleService) {
    // initialize moduleText to prevent error
    this.submoduleText = {
      content: "",
      id: 0,
      name: "",
      subtitle: "",
      semester: "",
      learningOutcomes: "",
      selfStudyHints: "",
      exam: "",
      literature: "",
      presenceRequirements: "",
      selfStudyRequirements: "",
      spokenlanguage: "",
      subModuleId: 0,
      type: "",
      languageId: 0
    };
  }

  ngOnInit(): void {
    if (this.languageAbbreviation) {
      this.getSubModuleText().then((moduleText) => {
        this.submoduleText = moduleText;
      });
    }
    }

  @Input() currentSubModule: any;
  @Output() currentSubModuleChange = new EventEmitter<any>();
  onSubModuleChange(module: SubModuleDetail) {
    this.currentSubModuleChange.emit(module);
  }


  @Input()
  languageAbbreviation: string | undefined;

  @Input()
  languageId: number | undefined;

  async getSubModuleText(): Promise<SubModuleTranslation> {
    // try get translation from this.module
    if (this.currentSubModule.translations) {
      const moduleTranslation= this.currentSubModule.translations.find((translation: { languageId: number | undefined; }) => translation.languageId === this.languageId);
      if (moduleTranslation) {
        return moduleTranslation;
      }
    }

    const moduleDetail = await firstValueFrom(this.submoduleService.get(this.currentSubModule.id, this.languageAbbreviation));

    // attach new translation to this.module
    this.currentSubModule.translations.push(moduleDetail.translations[0]);

    return moduleDetail.translations[0];
  }
}
