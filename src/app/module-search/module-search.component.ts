import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {AutoCompleteModule} from "primeng/autocomplete";
import {FilterService, SelectItemGroup} from "primeng/api";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import {Router} from "@angular/router";

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
    InputGroupAddonModule
  ],
  templateUrl: './module-search.component.html',
  styleUrl: './module-search.component.sass'
})
export class ModuleSearchComponent {
selectedModule: any;

    filteredModules!: any[];

    groupedCities!: SelectItemGroup[];

    constructor(private router: Router, private filterService: FilterService) { }

    ngOnInit() {
        this.groupedCities = [
            {
                label: 'MDI',
                items: [
                    { label: 'Animation 1', value: '/faculty/4/course/1' },
                    { label: 'Mediendesign', value: '/faculty/4/course/1' },
                    { label: 'Animation 2', value: '/faculty/4/course/1' },
                    { label: 'Mathe 1', value: '/faculty/4/course/1' },
                    { label: 'Mathe 2', value: '/faculty/4/course/1' }
                ]
            },
            {
                label: 'BIN',
                items: [
                    { label: 'Mathe 1', value: '/faculty/4/course/2' },
                    { label: 'Mathe 2', value: '/faculty/4/course/2' },
                    { label: 'Mathe 3', value: '/faculty/4/course/2' },
                    { label: 'Theoretische Informatik', value: '/faculty/4/course/2' }
                ]
            }
        ];
    }

    filterModule(event: AutoCompleteCompleteEvent) {

      if(!this.groupedCities) {
        return;
      }

        let query = event.query;
        let filteredGroups = [];

        for (let optgroup of this.groupedCities) {
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
    }

    async onKey(event: any) {
      if(event.key === "Enter") {

        if(
          this.filteredModules === undefined ||
          this.filteredModules?.length === 0 ||
          this.filteredModules[0].items.length === 0 ||
          this.filteredModules[0].items[0].value === undefined) {

          await this.router.navigate(['/']);
          return;
        }

        await this.router.navigate([this.filteredModules[0].items[0].value]);
      }
      else {
        this.filteredModules = [];
      }
    }
}
