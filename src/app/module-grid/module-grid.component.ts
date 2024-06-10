import { Component, Input, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ModuleDto, ModuleService} from "../../shared/module/module.service";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {AvatarModule} from "primeng/avatar";
import {Router} from "@angular/router";
import {LanguageService} from "../../shared/language/language.service";
import {TranslocoDirective} from "@jsverse/transloco";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {NgIf} from "@angular/common";
import {ToggleButtonModule} from "primeng/togglebutton";
import {CourseDto, CourseService} from "../../shared/course/course.service";
import {ABtestService} from "../../shared/abtest/abtest.service";

@Component({
  selector: 'app-module-grid',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    TooltipModule,
    DropdownModule,
    FormsModule,
    MultiSelectModule,
    AvatarModule,
    TranslocoDirective,
    ButtonModule,
    RippleModule,
    NgIf,
    ToggleButtonModule
  ],
  providers: [ModuleService, CourseService],
  templateUrl: './module-grid.component.html',
  styleUrl: './module-grid.component.sass'
})
export class ModuleGridComponent implements OnInit{
  users!: any[];
  statuses!: any[];
  selectedUser: any;
  selectedvalue: any;
  courseId: number | undefined;
  course: CourseDto | undefined;
  selectedColumns!: Column[];
  availableColumns!: Column[];

  @Input()
  groupByCourse = true;

  constructor(private moduleService: ModuleService,
              private router: Router,
              private languageService: LanguageService,
              private courseService: CourseService,
              protected abTestService: ABtestService
  ) {

  }

  ngOnInit(): void {
    this.availableColumns = [
            { field: 'semester', header: 'Semester' },
        ];
    this.selectedColumns = this.availableColumns;

    const url = this.router.url;
    const segments = url.split("/");

    const getIdFromSegment = (segment: string) => {
          const segmentIndex = segments.indexOf(segment);
          return segmentIndex !== -1 ? segments[segmentIndex + 1] : undefined;
    };

    this.courseId = Number(getIdFromSegment("course"));

    this.loadData();

    this.languageService.languageSubject.subscribe(() => {
      this.loadData()
    });
  }

  isSemesterIncluded(): boolean {
    return this.selectedColumns?.some(column => column.field === 'semester');
  }

  loadData(){
    this.moduleService.getAll(true, this.courseId).subscribe(
      modules => {
            this.modules = modules;
            this.statuses = [...new Set(modules.map(module => module.course))];
            this.users = [...new Set(modules.map(module => module.responsible))];
        });

    if(this.courseId)
      this.courseService.get(this.courseId).subscribe(course => {
        this.course = course;
      });
  }

  async openDetailView(module: ModuleDto) {
    console.log(module);
    await this.router.navigate(['faculty', module.facultyId, 'department', module.departmentId, 'course', module.courseId, 'module', module.id]);
  }

  module: ModuleDto | undefined;
  modules: ModuleDto[] = [];

  protected readonly console = console;


}

interface Column {
    field: string;
    header: string;
}
