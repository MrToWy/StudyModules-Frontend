import {Component, OnInit} from '@angular/core';
import {ModulePreviewComponent} from "../module-preview/module-preview.component";
import {ModuleDetail, ModuleService} from "../../shared/module/module.service";
import {UrlSegmentService} from "../../shared/url/url-segment.service";
import {SubmodulePreviewComponent} from "../submodule-preview/submodule-preview.component";
import {TabViewModule} from "primeng/tabview";
import {LanguageDto, LanguageService} from "../../shared/language/language.service";
import {NgForOf, NgIf} from "@angular/common";
import {ModuleEditorComponent} from "../module-edit-editor/module-editor.component";
import {ButtonModule} from "primeng/button";
import {ModuleTranslatorComponent} from "../module-translator/module-translator.component";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {StepperModule} from "primeng/stepper";
import {TranslocoDirective} from "@jsverse/transloco";

@Component({
  selector: 'app-module-edit',
  standalone: true,
  imports: [
    ModulePreviewComponent,
    SubmodulePreviewComponent,
    TabViewModule,
    NgForOf,
    ModuleEditorComponent,
    ButtonModule,
    ModuleTranslatorComponent,
    NgIf,
    DialogModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    ToastModule,
    StepperModule,
    TranslocoDirective
  ],
  providers: [
    ModuleService,
    UrlSegmentService,
    MessageService
  ],
  templateUrl: './module-edit.component.html',
  styleUrl: './module-edit.component.sass'
})
export class ModuleEditComponent implements OnInit {
  constructor(
    private moduleService: ModuleService,
    private urlSegmentService: UrlSegmentService,
    protected languageService: LanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    const moduleIdParameter = this.urlSegmentService.getIdFromSegment("module");
    const moduleId = Number(moduleIdParameter);
    if (moduleId) {
      this.moduleService.get(moduleId).subscribe((module) => {
        this.currentModule = module;
      });
    }

    const degreeProgramId = Number(this.urlSegmentService.getIdFromSegment("course"));

    if(moduleIdParameter === "new") {
      this.currentModule = this.moduleService.getEmptyModuleDetail();
      this.currentModule.degreeProgramId = degreeProgramId;
    }

    this.languageService.getLanguages().subscribe((languages) => {
      this.availableLanguages = languages;
    });
  }

  availableLanguages: LanguageDto[] | undefined;
  currentModule!: ModuleDetail;
  saveDialogVisible: boolean = false;
  saving: boolean = false;
  summaryText: string = "";
  summeryInputFieldClass: string = "";

  saveModule() {
    // is summary text empty?
    if (!this.summaryText) {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'Summary text is required'});
      this.summeryInputFieldClass = "ng-invalid ng-dirty";
      return;
    }

    this.saving = true;
    this.moduleService.save(this.currentModule).subscribe((module: any) => {
      this.saving = false;
      this.saveDialogVisible = false;
      this.router.navigate(['..', '..', module.id], { relativeTo: this.route });
    });
  }


}
