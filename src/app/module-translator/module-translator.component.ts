import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModuleEditorComponent} from "../module-edit-editor/module-editor.component";
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
    ModuleEditorComponent,
    ModulePreviewComponent
  ],
  providers: [
    ModuleService
  ],
  templateUrl: './module-translator.component.html',
  styleUrl: './module-translator.component.sass'
})
export class ModuleTranslatorComponent implements OnInit {
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
  }

  ngOnInit(): void {
    if (this.languageAbbreviation) {
      this.reorderTranslations(
        this.getModuleText(),
        this.currentModule.translations
      )

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
    let result = translations.find(
      (translation) => translation.languageId === this.languageId
    );

    if (!result) {
      const detail = await firstValueFrom(serviceCall());
      if(detail?.translations?.length > 0)
        result = detail.translations[0];
      else
        result = {languageId: this.languageId} as T;
      translations.push(result);
    }

    return result;
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
