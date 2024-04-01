import { Component } from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ToolbarModule} from "primeng/toolbar";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-topbar',
  standalone: true,
    imports: [
        BreadcrumbModule,
        ButtonModule,
        FormsModule,
        InputTextModule,
        ToolbarModule
    ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.sass'
})
export class TopbarComponent {
searchText: any;

  items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [
          {
            label: 'Fakultät 4',
            routerLink: '/fak4',
          },
          {
            label: 'Mediendesigninformatik'
          },
          {
            label: 'Mathe 1'
          }
          ];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }
}
