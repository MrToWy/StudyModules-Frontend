import { Component } from '@angular/core';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ToolbarModule} from "primeng/toolbar";
import {MenuItem} from "primeng/api";
import {SidebarComponent} from "../sidebar/sidebar.component";
import {AuthService} from "../../shared/auth/auth.service";
import {NavigationEnd, Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ToolbarModule,
    SidebarComponent,
    NgIf
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.sass'
})
export class TopbarComponent {
  private authService: AuthService;

  constructor(authService: AuthService, private router: Router) {
    this.authService = authService;

    router.events.subscribe((val) => {
        if(val instanceof NavigationEnd) {

          this.items = [];

          // url is e.g. /faculty/1/course/3/module/15
          let facultyId = val.url.split("/")[2];
          let courseId = val.url.split("/")[4];
          let moduleId = val.url.split("/")[6];

          if(courseId !== undefined && facultyId !== undefined) {
            this.items.push(
              {
                label: 'Fakultät ' + facultyId,
                routerLink: '/faculty/' + facultyId,
              },
              {
                label: 'Studiengang ' + courseId,
                routerLink: '/faculty/' + facultyId + '/course/' + courseId,
              }
            );
          }

          else if(facultyId !== undefined) {
            this.items.push(
              {
                label: 'Fakultät ' + facultyId,
                routerLink: '/faculty/' + facultyId,
              }
            );
          }
        }
    });
  }

searchText: any;

  items: MenuItem[] | undefined;

    home: MenuItem | undefined;

    ngOnInit() {
        this.items = [];

        this.home = { icon: 'pi pi-home', routerLink: '/' };
    }

  logout() {
    this.authService.logout();
  }
}
