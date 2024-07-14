import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModuleEditEditorComponent} from "../module-edit-editor/module-edit-editor.component";
import {ModulePreviewComponent} from "../module-preview/module-preview.component";
import {
  ModuleDetail,
  ModuleService,
  ModuleTranslation,
  RequirementTranslation
} from "../../shared/module/module.service";
import {firstValueFrom, Observable} from "rxjs";
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

      this.reorderTranslations(
        this.getRequirementText(this.currentModule.requirementsHardId),
        this.currentModule.requirementsHard.translations
      );

      this.reorderTranslations(
        this.getRequirementTextSoft(this.currentModule.requirementsSoftId),
        this.currentModule.requirementsSoft.translations
      );
    }
  }

  reorderTranslations(requirementTextPromise: Promise<any>, translations: any[]) {
    requirementTextPromise.then((requirementText: any) => {
      let index = translations.indexOf(requirementText);
      if (index > -1) {
        // Remove requirementText from its current position
        translations.splice(index, 1);

        // Insert requirementText at the first position
        translations.unshift(requirementText);
      }
    });
  }

  async getTranslation<T extends Translation>(
    translations: T[],
    serviceCall: () => Observable<{ translations: T[] }>
  ): Promise<T> {
    const existingTranslation = translations.find(
      (translation) => translation.languageId === this.languageId
    );
    if (existingTranslation) {
      return existingTranslation;
    }

    const detail = await firstValueFrom(serviceCall());
    translations.push(detail.translations[0]);

    return detail.translations[0];
  }

  async getModuleText(): Promise<ModuleTranslation> {
    return this.getTranslation<ModuleTranslation>(
      this.currentModule.translations,
      () => this.moduleService.get(this.currentModule.id, this.languageAbbreviation)
    );
  }

  async getRequirementText(requirementId: number): Promise<RequirementTranslation> {
    return this.getTranslation<RequirementTranslation>(
      this.currentModule.requirementsHard.translations,
      () => this.requirementService.get(requirementId, this.languageAbbreviation!)
    );
  }

  async getRequirementTextSoft(requirementId: number): Promise<RequirementTranslation> {
    return this.getTranslation<RequirementTranslation>(
      this.currentModule.requirementsSoft.translations,
      () => this.requirementService.get(requirementId, this.languageAbbreviation!)
    );
  }
}

interface Translation {
  languageId: number | undefined;
}
