import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {FacultyDto, FacultyService} from "../../shared/faculty/faculty.service";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Router} from "@angular/router";
import {CardModule} from "primeng/card";
import {NgForOf, NgStyle} from "@angular/common";
import {TranslocoDirective} from "@jsverse/transloco";
import {LanguageService} from "../../shared/language/language.service";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [
    ToastModule,
    TableModule,
    ButtonModule,
    RippleModule,
    CardModule,
    NgForOf,
    TranslocoDirective,
    NgStyle,
    TooltipModule
  ],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.sass',
  providers: [FacultyService]
})
export class FacultiesComponent implements OnInit, OnDestroy {
faculties!: FacultyDto[];

    selectedFaculty!: FacultyDto;

    constructor(
      private facultyService: FacultyService,
                private router: Router,
      private languageService: LanguageService
    ) {}

    ngOnInit() {
      this.loadFaculties()

      this.languageService.languageSubject.subscribe(() => {
        this.loadFaculties()
      });
    }

    ngOnDestroy() {
      this.languageService.languageSubject.unsubscribe();
    }

    loadFaculties() {
        this.facultyService.getAll().subscribe((data) => {
            this.faculties = data;
        });
    }

    async selectFaculty(faculty: FacultyDto) {

      const numberOfDepartmentsWithDegreePrograms = faculty.departments.filter(department => department.degreePrograms.length > 0).length;

      if(numberOfDepartmentsWithDegreePrograms === 1) {

        const department = faculty.departments.find(department => department.degreePrograms.length > 0);
        await this.router.navigate(['/faculty', faculty.id, 'department', department?.id], { state: {faculty: faculty} });
        return;
      }

      await this.router.navigate(['/faculty', faculty.id], { state: {faculty: faculty} });
    }

    addAlpha(color:string|undefined, opacity:number) {
      if (!color) {
        return color;
      }
      opacity = Math.round(opacity * 255);
      return color + opacity.toString(16).toUpperCase();
}

  async openGrid() {
    await this.router.navigate(['/overview']);
  }

  protected readonly console = console;
}
