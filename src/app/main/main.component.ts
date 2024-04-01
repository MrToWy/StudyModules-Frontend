import { Component } from '@angular/core';
import {MenubarModule} from "primeng/menubar";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {TabMenuModule} from "primeng/tabmenu";
import {BadgeModule} from "primeng/badge";
import {NgIf} from "@angular/common";
import {MenuModule} from "primeng/menu";
import {FormsModule} from "@angular/forms";
import {ToolbarModule} from "primeng/toolbar";
import {SplitButtonModule} from "primeng/splitbutton";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MenubarModule,
    InputTextModule,
    ButtonModule,
    TabMenuModule,
    BadgeModule,
    NgIf,
    MenuModule,
    FormsModule,
    ToolbarModule,
    SplitButtonModule,
    BreadcrumbModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.sass'
})
export class MainComponent {
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
