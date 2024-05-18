import { Component } from '@angular/core';
import {TableModule} from "primeng/table";
import {ModuleDto, ModuleService} from "../../shared/module/module.service";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-module-grid',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    TooltipModule
  ],
  providers: [ModuleService],
  templateUrl: './module-grid.component.html',
  styleUrl: './module-grid.component.sass'
})
export class ModuleGridComponent {

  constructor(moduleService: ModuleService) {
    moduleService.getAll().subscribe(modules => this.modules = modules);
  }

  module: ModuleDto | undefined;
  modules: ModuleDto[] = [];

  protected readonly console = console;
}
