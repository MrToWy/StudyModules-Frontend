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
import {NgForOf, NgIf} from "@angular/common";
import {ModuleSearchComponent} from "../module-search/module-search.component";
import {LanguageDropdownComponent} from "../language-dropdown/language-dropdown.component";
import {ModuleDto, ModuleService} from "../../shared/module/module.service";
import {CourseDto, CourseService} from "../../shared/course/course.service";

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
    LanguageDropdownComponent,
    NgForOf
  ],
  providers: [ModuleService, CourseService],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.sass'
})
export class TopbarComponent {
  private authService: AuthService;

  constructor(authService: AuthService, protected router: Router, moduleService: ModuleService, courseService: CourseService) {
    this.authService = authService;

    router.events.subscribe(async (val) => {
      if (val instanceof NavigationEnd) {

        this.items = [];

        // url is e.g. /faculty/1/course/3/module/15
        const segments = val.url.split("/");

        const getIdFromSegment = (segment: string) => {
          const segmentIndex = segments.indexOf(segment);
          return segmentIndex !== -1 ? segments[segmentIndex + 1] : undefined;
        };

        const facultyId = getIdFromSegment("faculty");
        const courseId = getIdFromSegment("course");
        const moduleId = getIdFromSegment("module");

        if (facultyId !== undefined) {
          const facultyLink = {
            label: 'Fakultät ' + facultyId,
            routerLink: '/faculty/' + facultyId,
          };
          this.items.push(facultyLink);

          if (courseId !== undefined) {
            const courseNumber = parseInt(courseId);
            courseService.get(courseNumber).subscribe((course: CourseDto) => {
              const courseLink = {
                label: 'Studiengang ' + course.abbreviation,
                routerLink: '/faculty/' + facultyId + '/department/' + courseId,
              };
              this.items?.push(courseLink);

              if (moduleId !== undefined) {

                // find module with id moduleId
                course.modules.find((module: ModuleDto) => {
                  if (module.id === parseInt(moduleId)) {
                    const moduleLink = {
                      label: 'Modul ' + module.name,
                      routerLink: '/faculty/' + facultyId + '/course/' + courseId + '/module/' + moduleId,
                    };
                    this.items?.push(moduleLink);
                  }
                });
              }
            });



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
