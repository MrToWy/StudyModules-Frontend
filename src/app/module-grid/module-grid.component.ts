import { Component } from '@angular/core';
import {TableModule} from "primeng/table";
import {ModuleDto, ModuleService} from "../../shared/module/module.service";

@Component({
  selector: 'app-module-grid',
  standalone: true,
  imports: [
    TableModule
  ],
  providers: [ModuleService],
  templateUrl: './module-grid.component.html',
  styleUrl: './module-grid.component.sass'
})
export class ModuleGridComponent {

  constructor(moduleService: ModuleService) {
    moduleService.getAll().subscribe(modules => this.modules = modules);
  }

  modules: ModuleDto[] = [];

  protected readonly console = console;
}
