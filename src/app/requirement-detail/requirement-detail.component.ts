import {Component, OnInit} from '@angular/core';
import {RequirementDto, RequirementService} from "../../shared/requirement/requirement.service";
import {UrlSegmentService} from "../../shared/url/url-segment.service";
import {CourseDto, CourseService} from "../../shared/course/course.service";
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {TreeTableModule} from "primeng/treetable";
import {NgForOf, NgIf} from "@angular/common";
import {TreeNode} from "primeng/api";
import {ModuleDto} from "../../shared/module/module.service";
import {TableModule} from "primeng/table";
import {ChipModule} from "primeng/chip";
import {MultiSelectModule} from "primeng/multiselect";
import {InputTextareaModule} from "primeng/inputtextarea";
import {activeTranslationIndex} from "../module-translator/module-translator.component";

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
    MultiSelectModule,
    InputTextareaModule
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
  selectedModules: number[] = [];
  modulesInUseSoft: ModuleDto[] = [];
  modulesInUseHard: ModuleDto[] = [];

  requirements: any[] | undefined;
  selectedRequirements: any;

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
      this.selectedRequirements = this.requirement.requiredSemesters != "" ? this.requirement.requiredSemesters.split(',') : [];
      console.log(this.selectedRequirements);

      this.courseService.getAll().subscribe(courses => {
        this.courses = courses;

        this.selectedCourse = this.courses.find(course => course.id === this.requirement?.degreeProgramId);

        this.selectedModules = this.requirement!.modules.map(module => module.id);

        this.modulesInUseSoft = this.selectedCourse?.modules.filter(module => module.requirementsSoftId === this.requirement?.id) || [];
        this.modulesInUseHard = this.selectedCourse?.modules.filter(module => module.requirementsHardId === this.requirement?.id) || [];
      });
    });

    this.requirements = [

                    { label: '1. Semester', value: '1' },
                    { label: '2. Semester', value: '2' },
                    { label: '3. Semester', value: '3' },
                    { label: '4. Semester', value: '4' },
                    { label: '5. Semester', value: '5' },
                    { label: '6. Semester', value: '6' },
                    { label: '7. Semester', value: '7' }
                ];

  }

  onCourseChange($event: DropdownChangeEvent) {
    this.selectedModules = [];
    this.loadCourses();
  }

  private loadCourses() {
    this.filteredModules = this.selectedCourse?.modules;
  }

  protected readonly activeTranslationIndex = activeTranslationIndex;
}
