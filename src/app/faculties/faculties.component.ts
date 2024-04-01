import { Component } from '@angular/core';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {FacultyDto, FacultyService} from "../../shared/faculty/faculty.service";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@Component({
  selector: 'app-faculties',
  standalone: true,
  imports: [
    ToastModule,
    TableModule,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './faculties.component.html',
  styleUrl: './faculties.component.sass',
  providers: [FacultyService, MessageService]
})
export class FacultiesComponent {
faculties!: FacultyDto[];

    selectedFaculty!: FacultyDto;

    constructor(private facultyService: FacultyService, private messageService: MessageService) {}

    ngOnInit() {
        this.facultyService.mockGetAllObservable().subscribe((data) => {
            this.faculties = data;
        });
    }

    selectProduct(faculty: FacultyDto) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: faculty.name });
    }
}
