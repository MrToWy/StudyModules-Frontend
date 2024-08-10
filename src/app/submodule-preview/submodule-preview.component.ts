import {Component, Input} from '@angular/core';
import {SubModuleDetail} from "../../shared/submodule/submodule.service";
import {translate} from "@jsverse/transloco";
import {activeTranslationIndex} from "../module-translator/module-translator.component";

@Component({
  selector: 'app-submodule-preview',
  standalone: true,
  imports: [],
  templateUrl: './submodule-preview.component.html',
  styleUrl: './submodule-preview.component.sass'
})
export class SubmodulePreviewComponent {
  distinctAbbreviations: string[] = [];
  requirements: string = "";

  get submodule(): SubModuleDetail {
    return this._submodule;
  }

  @Input()
  set submodule(value: SubModuleDetail) {
    this._submodule = value;
    this.extractDistinctAbbreviations();
    this.requirements = this.extractRequirements();
  }

  private _submodule!: SubModuleDetail;

  extractDistinctAbbreviations(): void {
    if (this.submodule?.modules) {
      const abbreviations = this.submodule.modules.map(module => module.degreeProgram.abbreviation);
      this.distinctAbbreviations = [...new Set(abbreviations)];
    }
  }

  extractRequirements(): string {
    const requirementsNames = this.submodule?.modules?.map(
        (module) => module.requirementsSoft.translations[0].name
    );

    if (!requirementsNames) {
        return "";
    }

    const uniqueNames = Array.from(new Set(requirementsNames));

    if (uniqueNames.length === 1) {
        return uniqueNames[0];
    } else {
        return uniqueNames.join('\n\n' + translate("respectively") + '\n\n');
    }
}

  protected readonly activeTranslationIndex = activeTranslationIndex;
}
