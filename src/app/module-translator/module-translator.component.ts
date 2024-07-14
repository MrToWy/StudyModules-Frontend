import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModuleEditEditorComponent} from "../module-edit-editor/module-edit-editor.component";
import {ModulePreviewComponent} from "../module-preview/module-preview.component";
import {
  ModuleDetail,
  ModuleService,
  ModuleTranslation,
  RequirementTranslation
} from "../../shared/module/module.service";
import {firstValueFrom} from "rxjs";
import {RequirementService} from "../../shared/requirement/requirement.service";

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
export class ModuleTranslatorComponent implements OnInit {
  public moduleText: ModuleTranslation;

  @Input()
  nextCallback: EventEmitter<void> = new EventEmitter<void>();

  @Input()
  currentModule!: ModuleDetail;
  @Output() currentModuleChange = new EventEmitter<any>();

  onModuleChange(module: ModuleDetail) {
    this.currentModuleChange.emit(module);
  }


  @Input()
  languageAbbreviation: string | undefined;

  @Input()
  languageId: number | undefined;

  constructor(
    private moduleService: ModuleService,
    private requirementService: RequirementService
  ) {
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

      this.getRequirementText(this.currentModule.requirementsHardId).then((requirementText) => {
        let translations = this.currentModule.requirementsHard.translations;
        let index = translations.indexOf(requirementText);
        if (index > -1) {
          // Remove requirementText from its current position
          translations.splice(index, 1);

          // Insert requirementText at the first position
          translations.unshift(requirementText);
        }
      });

      this.getRequirementTextSoft(this.currentModule.requirementsSoftId).then((requirementText) => {
        let translations = this.currentModule.requirementsSoft.translations;
        let index = translations.indexOf(requirementText);
        if (index > -1) {
          // Remove requirementText from its current position
          translations.splice(index, 1);

          // Insert requirementText at the first position
          translations.unshift(requirementText);
        }
      });
    }
  }


  async getModuleText(): Promise<ModuleTranslation> {
    // try get translation from this.module
    if (this.currentModule.translations) {
      const moduleTranslation = this.currentModule.translations.find(
        (translation: { languageId: number | undefined; }) => translation.languageId === this.languageId);
      if (moduleTranslation) {
        return moduleTranslation;
      }
    }

    const moduleDetail = await firstValueFrom(this.moduleService.get(this.currentModule.id, this.languageAbbreviation));


    // attach new translation to this.module
    this.currentModule.translations.push(moduleDetail.translations[0]);

    return moduleDetail.translations[0];
  }

  async getRequirementText(requirementId: number): Promise<RequirementTranslation> {
    // try get translation from this.module
    if (this.currentModule.requirementsHard.translations) {
      const requirementTranslation = this.currentModule.requirementsHard.translations.find(
        (translation: { languageId: number | undefined; }) => translation.languageId === this.languageId);
      if (requirementTranslation) {
        return requirementTranslation;
      }
    }

    const requirementDetail = await firstValueFrom(this.requirementService.get(requirementId, this.languageAbbreviation!));

    // attach new translation to this.module
    this.currentModule.requirementsHard.translations.push(requirementDetail.translations[0]);

    return requirementDetail.translations[0];
  }

  async getRequirementTextSoft(requirementId: number): Promise<RequirementTranslation> {
    // try get translation from this.module
    if (this.currentModule.requirementsSoft.translations) {
      const requirementTranslation = this.currentModule.requirementsSoft.translations.find(
        (translation: { languageId: number | undefined; }) => translation.languageId === this.languageId);
      if (requirementTranslation) {
        return requirementTranslation;
      }
    }

    const requirementDetail = await firstValueFrom(this.requirementService.get(requirementId, this.languageAbbreviation!));

    // attach new translation to this.module
    this.currentModule.requirementsSoft.translations.push(requirementDetail.translations[0]);

    return requirementDetail.translations[0];
  }
}
