import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FilterService, SelectItemGroup} from "primeng/api";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {Router} from "@angular/router";
import {TranslocoDirective} from "@jsverse/transloco";
import {ModuleService} from "../../shared/module/module.service";
import {CourseService} from "../../shared/course/course.service";
import {activeTranslationIndex} from "../module-translator/module-translator.component";

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-module-search',
  standalone: true,
  imports: [
    FormsModule,
    AutoCompleteModule,
    InputGroupModule,
    InputGroupAddonModule,
    TranslocoDirective
  ],
  templateUrl: './module-search.component.html',
  styleUrl: './module-search.component.sass'
})
export class ModuleSearchComponent {
  selectedModule: any;

  filteredModules!: any[];

  groupedModules!: SelectItemGroup[];

  constructor(
    private router: Router,
    private filterService: FilterService,
    private moduleService: ModuleService,
    private courseService: CourseService
  ) {
  }

  ngOnInit() {

    this.courseService.getAll().subscribe(courses => {
      this.groupedModules = courses.map(course => {
        const courseLabel = course?.translations?.[activeTranslationIndex]?.name;
        const coursePath = `/faculty/${course.department.facultyId}/department/${course.department.id}/course/${course.id}`;

        const items = course.modules.map(module => {
          return {
            label: module.translations?.[activeTranslationIndex]?.name,
            value: `${coursePath}/module/${module.id}`
          };
        });

        return {
          label: courseLabel,
          items: items
        };
      });
    });

  }

  filterModule(event: AutoCompleteCompleteEvent) {

    if (!this.groupedModules) {
      return;
    }

    let query = event.query;
    let filteredGroups = [];

    for (let optgroup of this.groupedModules) {
      let filteredSubOptions = this.filterService.filter(optgroup.items, ['label'], query, "contains");
      if (filteredSubOptions && filteredSubOptions.length) {
        filteredGroups.push({
          label: optgroup.label,
          value: optgroup.value,
          items: filteredSubOptions
        });
      }
    }

    this.filteredModules = filteredGroups;
  }

  async onSelect(event: any) {
    await this.router.navigate([event.value.value]);
    window.location.reload();
  }

  async onKey(event: any) {
    if (event.key === "Enter") {

      if (
        this.filteredModules === undefined ||
        this.filteredModules?.length === 0 ||
        this.filteredModules[0].items.length === 0 ||
        this.filteredModules[0].items[0].value === undefined) {

        await this.router.navigate(['/']);
        return;
      }

      await this.router.navigate([this.filteredModules[0].items[0].value]);
      window.location.reload();
    }
  }
}
