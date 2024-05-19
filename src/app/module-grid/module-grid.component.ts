import {Component, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ModuleDto, ModuleService} from "../../shared/module/module.service";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {AvatarModule} from "primeng/avatar";

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
    AvatarModule
  ],
  providers: [ModuleService],
  templateUrl: './module-grid.component.html',
  styleUrl: './module-grid.component.sass'
})
export class ModuleGridComponent {
  users!: any[];
  statuses!: any[];
  selectedUser: any;
  selectedvalue: any;

  constructor(moduleService: ModuleService) {
    moduleService.getAll().subscribe(
      modules => {
            this.modules = modules;
            this.statuses = [...new Set(modules.map(module => module.course))];
            this.users = [...new Set(modules.map(module => module.responsible))];
            console.log(this.users)
        });
  }

  module: ModuleDto | undefined;
  modules: ModuleDto[] = [];

  protected readonly console = console;


}
