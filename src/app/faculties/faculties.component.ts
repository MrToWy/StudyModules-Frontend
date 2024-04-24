import { Component } from '@angular/core';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {FacultyDto, FacultyService} from "../../shared/faculty/faculty.service";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {Router} from "@angular/router";
import {CardModule} from "primeng/card";
import {NgForOf} from "@angular/common";
import {TranslocoDirective} from "@jsverse/transloco";

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
    TranslocoDirective
  ],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.sass',
  providers: [FacultyService]
})
export class FacultiesComponent {
faculties!: FacultyDto[];

    selectedFaculty!: FacultyDto;

    constructor(private facultyService: FacultyService,
                private router: Router) {}

    ngOnInit() {
        this.facultyService.getAll().subscribe((data) => {
            this.faculties = data;
        });
    }

    selectFaculty(faculty: FacultyDto) {
        this.router.navigate(['/faculty', faculty.id]).then(r => console.log(r));
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
}
