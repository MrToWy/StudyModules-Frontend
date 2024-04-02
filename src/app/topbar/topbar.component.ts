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

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    BreadcrumbModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    ToolbarModule,
    SidebarComponent
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.sass'
})
export class TopbarComponent {
  private authService: AuthService;

  constructor(authService: AuthService, private router: Router) {
    this.authService = authService;

    router.events.subscribe((val) => {
        // see also
        console.log(val instanceof NavigationEnd)
        if(val instanceof NavigationEnd) {

          this.items = [];

          // url is e.g. /faculty/1/mdi/math2
          let facultyId = val.url.split("/")[2];

          if(facultyId !== undefined) {
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
