import {Component, Input} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FacultyDto, FacultyService} from "../../shared/faculty/faculty.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {DepartmentDto, DepartmentService} from "../../shared/department/department.service";
import {CourseDto} from "../../shared/course/course.service";

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

    @Input()
    selectedFaculty: FacultyDto | undefined;

    selectedDepartment!: DepartmentDto;

    constructor(private departmentService: DepartmentService,
                private router: Router,
                private route: ActivatedRoute
                ) {}

    ngOnInit() {
        this.departmentService.getAll()
          .subscribe((data) => {
            this.departments = data.filter(department => department.faculty.id === this.selectedFaculty?.id);
        });
    }

    async selectCourse(department: DepartmentDto, course: CourseDto) {
        await this.router.navigate(['department', department.id, 'course', course.id], {relativeTo: this.route});
    }

    // ToDo: Refactor duplicate code
  addAlpha(color: string | undefined, opacity: number) {
    if (!color) {
        return color;
      }
      opacity = Math.round(opacity * 255);
      return color + opacity.toString(16).toUpperCase();  }
}
