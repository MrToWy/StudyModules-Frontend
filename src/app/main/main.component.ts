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
import {TopbarComponent} from "../topbar/topbar.component";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {FacultiesComponent} from "../faculties/faculties.component";

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
    BreadcrumbModule,
    TopbarComponent,
    SidebarComponent,
    FacultiesComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.sass'
})
export class MainComponent {

}
