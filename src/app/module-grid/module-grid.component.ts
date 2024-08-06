import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {TableModule} from "primeng/table";
import {ModuleDto, ModuleService} from "../../shared/module/module.service";
import {TagModule} from "primeng/tag";
import {TooltipModule} from "primeng/tooltip";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {MultiSelectModule} from "primeng/multiselect";
import {AvatarModule} from "primeng/avatar";
import {ActivatedRoute, Router} from "@angular/router";
import {LanguageService} from "../../shared/language/language.service";
import {TranslocoDirective} from "@jsverse/transloco";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {NgIf} from "@angular/common";
import {ToggleButtonModule} from "primeng/togglebutton";
import {CourseDto, CourseService} from "../../shared/course/course.service";
import {ABtestService} from "../../shared/abtest/abtest.service";
import {ResponsibleAvatarComponent} from "../responsible-avatar/responsible-avatar.component";
import {AuthService} from "../../shared/auth/auth.service";
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
    ToggleButtonModule,
    ResponsibleAvatarComponent
  ],
  providers: [ModuleService, CourseService, AuthService],
  templateUrl: './module-grid.component.html',
  styleUrl: './module-grid.component.sass'
})
export class ModuleGridComponent implements OnInit, OnDestroy{
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
              private route: ActivatedRoute,
              private languageService: LanguageService,
              private courseService: CourseService,
              protected abTestService: ABtestService,
              protected authService: AuthService,
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

  ngOnDestroy() {
    this.languageService.languageSubject.unsubscribe();
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
    await this.router.navigate(['module', module.id], {relativeTo: this.route});
  }

  module: ModuleDto | undefined;
  modules: ModuleDto[] = [];

  protected readonly console = console;


  async addNewModule() {
    await this.router.navigate(['module', 'new', 'edit'], {relativeTo: this.route});
  }
}

interface Column {
    field: string;
    header: string;
}
