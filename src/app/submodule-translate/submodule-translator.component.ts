import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModuleEditorComponent} from "../module-edit-editor/module-editor.component";
import {ModulePreviewComponent} from "../module-preview/module-preview.component";
import {SubmodulePreviewComponent} from "../submodule-preview/submodule-preview.component";
import {RequirementTranslation, SubModuleTranslation} from "../../shared/module/module.service";
import {firstValueFrom, Observable} from "rxjs";
import {SubModuleDetail, SubmoduleService} from "../../shared/submodule/submodule.service";
import {SubmoduleEditorComponent} from "../submodule-editor/submodule-editor.component";
import {RequirementService} from "../../shared/requirement/requirement.service";

@Component({
  selector: 'app-submodule-translator',
  standalone: true,
  imports: [
    ModuleEditorComponent,
    ModulePreviewComponent,
    SubmodulePreviewComponent,
    SubmoduleEditorComponent
  ],
  templateUrl: './submodule-translator.component.html',
  styleUrl: './submodule-translator.component.sass'
})
export class SubmoduleTranslatorComponent {

  @Input()
  nextCallback: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private submoduleService: SubmoduleService,
    private requirementService: RequirementService
  ) {
  }

  ngOnInit(): void {
    if (this.languageAbbreviation) {
      this.reorderTranslations(
        this.getSubModuleText(),
        this.currentSubModule.translations
      );

      this.reorderTranslations(
        this.getRequirementTextSoft(this.currentSubModule.requirementsSoftId),
        this.currentSubModule.requirementsSoft.translations
      );
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

  // ToDo: Duplicate code (module-translator.component.ts)
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

  async getRequirementTextSoft(requirementId: number): Promise<RequirementTranslation> {
    return this.getTranslation<RequirementTranslation>(
      this.currentSubModule.requirementsSoft.translations,
      () => this.requirementService.get(requirementId, this.languageAbbreviation!)
    );
  }

  async getSubModuleText(): Promise<SubModuleTranslation> {
    return this.getTranslation<SubModuleTranslation>(
      this.currentSubModule.translations,
      () => this.submoduleService.get(this.currentSubModule.id, this.languageAbbreviation)
    );
  }
}

interface Translation {
  languageId: number | undefined;
}
