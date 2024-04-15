import {Component} from '@angular/core';
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
import {ModuleSearchComponent} from "../module-search/module-search.component";
import {LanguageDropdownComponent} from "../language-dropdown/language-dropdown.component";

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
    NgIf,
    ModuleSearchComponent,
    LanguageDropdownComponent
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.sass'
})
export class TopbarComponent {
  private authService: AuthService;

  constructor(authService: AuthService, protected router: Router) {
    this.authService = authService;

    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {

        this.items = [];

        // url is e.g. /faculty/1/course/3/module/15
        const segments = val.url.split("/");

        const getIdFromSegment = (segment: string) => {
          const segmentIndex = segments.indexOf(segment);
          return segmentIndex !== -1 ? segments[segmentIndex + 1] : undefined;
        };

        const facultyId = getIdFromSegment("faculty");
        const departmentId = getIdFromSegment("department");
        const courseId = getIdFromSegment("course");
        const moduleId = getIdFromSegment("module");

        if (facultyId !== undefined) {
          const facultyLink = {
            label: 'Fakultät ' + facultyId,
            routerLink: '/faculty/' + facultyId,
          };
          this.items.push(facultyLink);

          if (departmentId !== undefined) {
            const departmentLink = {
              label: 'Abteilung ' + departmentId,
              routerLink: '/faculty/' + facultyId + '/department/' + departmentId,
            };
            this.items.push(departmentLink);

            if (courseId !== undefined) {
              const courseLink = {
                label: 'Studiengang ' + courseId,
                routerLink: '/faculty/' + facultyId + '/department/' + departmentId + '/course/' + courseId,
              };
              this.items.push(courseLink);

              if (moduleId !== undefined) {
                const moduleLink = {
                  label: 'Modul ' + moduleId,
                  routerLink: '/faculty/' + facultyId + '/department/' + departmentId + '/course/' + courseId + '/module/' + moduleId,
                };
                this.items.push(moduleLink);
              }
            }
          }
        }


      }
    });
  }

  searchText: any;

  items: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit() {
    this.items = [];

    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  logout() {
    this.authService.logout();
  }
}
