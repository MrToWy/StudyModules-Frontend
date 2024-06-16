import {Component, OnInit} from '@angular/core';
import {RequirementDto, RequirementService} from "../shared/requirement/requirement.service";
import {UrlSegmentService} from "../shared/url/url-segment.service";
import {CourseDto, CourseService} from "../shared/course/course.service";
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {TreeTableModule} from "primeng/treetable";
import {NgForOf, NgIf} from "@angular/common";
import {TreeNode} from "primeng/api";
import {ModuleDto, ModuleService} from "../shared/module/module.service";
import {TableModule} from "primeng/table";
import {ChipModule} from "primeng/chip";
import {MultiSelectModule} from "primeng/multiselect";

@Component({
  selector: 'app-requirement-detail',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    TreeTableModule,
    NgForOf,
    NgIf,
    TableModule,
    ChipModule,
    MultiSelectModule
  ],
  providers: [
    RequirementService,
    CourseService
  ],
  templateUrl: './requirement-detail.component.html',
  styleUrl: './requirement-detail.component.sass'
})
export class RequirementDetailComponent implements OnInit {

  requirement: RequirementDto | undefined;
  courses: CourseDto[] | undefined;
  selectedCourse: CourseDto | undefined;
  filteredModules: ModuleDto[] | undefined;
  selectedModules: ModuleDto[] = [];

  selectionKeys = {};
  files: TreeNode<any>[] | undefined;

  requirements: any[] | undefined;
  selectedRequirements: any;

  hardRequirements: any[] | undefined;
  selectedHardRequirements: any;

  constructor(
    private segmentService: UrlSegmentService,
    private requirementService: RequirementService,
    private courseService: CourseService,
  ) {
  }

  ngOnInit(): void {
    const requirementId = Number(this.segmentService.getIdFromSegment("requirement"));
    this.requirementService.getOne(requirementId).subscribe(requirement => {
      this.requirement = requirement;
    });

    this.courseService.getAll().subscribe(courses => {
      this.courses = courses;
    });


    this.requirements = [

                    { label: '1. Semester besucht', value: '1' },
                    { label: '2. Semester besucht', value: '2' },
                    { label: '3. Semester besucht', value: '3' },
                    { label: '4. Semester besucht', value: '4' },
                    { label: '5. Semester besucht', value: '5' },
                    { label: '6. Semester besucht', value: '6' },
                    { label: '7. Semester besucht', value: '7' }
                ];

     this.hardRequirements = [
                    { label: '1. Semester bestanden', value: '1b' },
                    { label: '2. Semester bestanden', value: '2b' },
                    { label: '3. Semester bestanden', value: '3b' },
                    { label: '4. Semester bestanden', value: '4b' },
                    { label: '5. Semester bestanden', value: '5b' },
                    { label: '6. Semester bestanden', value: '6b' },
                    { label: '7. Semester bestanden', value: '7b' }
                ];

  }

  onCourseChange($event: DropdownChangeEvent) {
    this.loadCourses();
  }

  private loadCourses() {
    this.filteredModules = this.selectedCourse?.modules;

    if (this.filteredModules) {
      this.files = this.transformModulesToTreeNodes(this.filteredModules);
    }
  }

  private transformModulesToTreeNodes(modules: ModuleDto[]): TreeNode[] {
    const semesterMap: { [key: string]: TreeNode } = {};

    modules.forEach(module => {
      const semesters = module.semester.split('-').map((s: string) => s.trim());

      semesters.forEach(semester => {
        if (!semesterMap[semester]) {
          console.log(semester)
          semesterMap[semester] = {
            label: `Semester ${semester}`,
            children: []
          };
        }

        semesterMap[semester].children?.push({
          label: module.abbreviation,
          data: module
        });
      });
    });

    return Object.values(semesterMap);
  }

  onModuleRemove($event: MouseEvent, module: any) {

  }

  protected readonly console = console;
}
