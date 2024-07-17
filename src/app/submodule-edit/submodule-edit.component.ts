import {Component, OnInit} from '@angular/core';
import {SubmoduleTranslatorComponent} from "../submodule-translate/submodule-translator.component";
import {StepperModule} from "primeng/stepper";
import {TranslocoDirective} from "@jsverse/transloco";
import {NgForOf, NgIf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {LanguageDto, LanguageService} from "../../shared/language/language.service";
import {MessageService} from "primeng/api";
import {InputTextareaModule} from "primeng/inputtextarea";
import {UrlSegmentService} from "../../shared/url/url-segment.service";
import {SubmoduleService} from "../../shared/submodule/submodule.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SubModule} from "../../shared/module/module.service";

@Component({
  selector: 'app-submodule-edit',
  standalone: true,
  imports: [
    SubmoduleTranslatorComponent,
    StepperModule,
    TranslocoDirective,
    NgIf,
    ToastModule,
    ButtonModule,
    FormsModule,
    InputTextareaModule,
    NgForOf
  ],
  providers: [
    MessageService
  ],
  templateUrl: './submodule-edit.component.html',
  styleUrl: './submodule-edit.component.sass'
})
export class SubmoduleEditComponent implements OnInit {

  availableLanguages: LanguageDto[] | undefined;
  currentSubmodule!: SubModule;
  saveDialogVisible: boolean = false;
  saving: boolean = false;
  summaryText: string = "";
  summeryInputFieldClass: string = "";

  constructor(
    protected languageService: LanguageService,
    private urlSegmentService: UrlSegmentService,
    private subModuleService: SubmoduleService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const subModuleIdParameter = this.urlSegmentService.getIdFromSegment("submodules");
    const subModuleId = Number(subModuleIdParameter);

    if (subModuleId) {
      this.subModuleService.getOne(subModuleId).subscribe((subModule) => {
        this.currentSubmodule = subModule;
      });
    }

    this.languageService.getLanguages().subscribe((languages) => {
      this.availableLanguages = languages;
    });
  }

  saveSubModule() {
// is summary text empty?
    if (!this.summaryText) {
      this.summeryInputFieldClass = "ng-invalid ng-dirty";
      return;
    }

    this.saving = true;
    this.subModuleService.save(this.currentSubmodule).subscribe(async (module: any) => {
      this.saving = false;
      this.saveDialogVisible = false;
      await this.router.navigate(['..', '..', module.id], {relativeTo: this.route});
    });
  }
}
