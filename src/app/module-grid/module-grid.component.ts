import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ModuleDto, ModuleService} from "../../shared/module/module.service";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {AvatarModule} from "primeng/avatar";
import {Router} from "@angular/router";
import {LanguageService} from "../../shared/language/language.service";
import {TranslocoDirective} from "@jsverse/transloco";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {NgIf} from "@angular/common";
import {ToggleButtonModule} from "primeng/togglebutton";

@Component({
  selector: 'app-module-grid',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    TooltipModule,
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    AvatarModule,
    TranslocoDirective,
    ButtonModule,
    RippleModule,
    NgIf,
    ToggleButtonModule
  ],
  providers: [ModuleService],
  templateUrl: './module-grid.component.html',
  styleUrl: './module-grid.component.sass'
})
export class ModuleGridComponent implements OnInit{
  users!: any[];
  statuses!: any[];
  selectedUser: any;
  selectedvalue: any;
  groupByCourse = true;

  constructor(private moduleService: ModuleService,
              private router: Router,
              private languageService: LanguageService,
              private cd: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.loadData();

    this.languageService.languageSubject.subscribe(() => {
      this.loadData()
    });
  }

  loadData(){
    this.moduleService.getAll(true).subscribe(
      modules => {
            this.modules = modules;
            this.statuses = [...new Set(modules.map(module => module.course))];
            this.users = [...new Set(modules.map(module => module.responsible))];
        });
  }

  async openDetailView(module: ModuleDto) {
    console.log(module);
    await this.router.navigate(['faculty', module.facultyId, 'department', module.departmentId, 'course', module.courseId, 'module', module.id]);
  }

  module: ModuleDto | undefined;
  modules: ModuleDto[] = [];

  protected readonly console = console;


}
