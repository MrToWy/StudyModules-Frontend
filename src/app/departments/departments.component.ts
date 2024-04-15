import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FacultyDto, FacultyService} from "../../shared/faculty/faculty.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {DepartmentDto, DepartmentService} from "../../shared/department/department.service";

@Component({
  selector: 'app-departments',
  standalone: true,
    imports: [
        NgForOf
    ],
  providers: [DepartmentService],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.sass'
})
export class DepartmentsComponent {
    departments!: DepartmentDto[];

    selectedDepartment!: DepartmentDto;

    constructor(private departmentService: DepartmentService,
                private router: Router,
                private route: ActivatedRoute
                ) {}

    ngOnInit() {
        this.departmentService.mockGetAllObservable().subscribe((data) => {
            this.departments = data;
        });
    }

    async selectDepartment(department: DepartmentDto) {
        await this.router.navigate(['department', department.id], {relativeTo: this.route});
    }
}
