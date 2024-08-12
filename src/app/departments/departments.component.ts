import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {DepartmentDto, DepartmentService} from "../../shared/department/department.service";
import {CourseDto} from "../../shared/course/course.service";
import {activeTranslationIndex} from "../module-translator/module-translator.component";
import {UrlSegmentService} from "../../shared/url/url-segment.service";

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
export class DepartmentsComponent implements OnInit{
    departments!: DepartmentDto[];

    constructor(private departmentService: DepartmentService,
                private router: Router,
                private route: ActivatedRoute,
                private segmentService: UrlSegmentService
                ) {}

    ngOnInit() {
        this.departmentService.getAll()
          .subscribe((data) => {
            const facultyId = Number(this.segmentService.getIdFromSegment("faculty"));
            this.departments = data.filter(department => department.faculty.id === facultyId);
        });
    }

    async selectCourse(department: DepartmentDto, course: CourseDto) {
        await this.router.navigate(['department', department.id, 'course', course.id], {relativeTo: this.route});
    }

  addAlpha(color: string | undefined, opacity: number) {
    if (!color) {
        return color;
      }
      opacity = Math.round(opacity * 255);
      return color + opacity.toString(16).toUpperCase();  }

  protected readonly activeTranslationIndex = activeTranslationIndex;
}
