import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogModule} from "primeng/dialog";
import {TranslocoDirective} from "@jsverse/transloco";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {ModuleDto, Requirement, RequirementTranslation} from "../../shared/module/module.service";
import {CourseService} from "../../shared/course/course.service";
import {UrlSegmentService} from "../../shared/url/url-segment.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-requirement-editor',
  standalone: true,
  imports: [
    DialogModule,
    TranslocoDirective,
    MultiSelectModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    NgIf
  ],
  providers: [CourseService],
  templateUrl: './requirement-editor.component.html',
  styleUrl: './requirement-editor.component.sass'
})
export class RequirementEditorComponent implements OnInit{

  constructor(
    private courseService: CourseService,
    private urlSegmentService: UrlSegmentService
  ) {
  }

  ngOnInit(): void {
      this.availableSemester = [
                    { label: '1. Semester', value: '1' },
                    { label: '2. Semester', value: '2' },
                    { label: '3. Semester', value: '3' },
                    { label: '4. Semester', value: '4' },
                    { label: '5. Semester', value: '5' },
                    { label: '6. Semester', value: '6' },
                    { label: '7. Semester', value: '7' }
                ];

      this.courseService.get(Number(this.urlSegmentService.getIdFromSegment("course"))).subscribe(course => {
        this.availableModules = course.modules;
        console.log(this.availableModules);
      });

      this.onRequirementChange(this.requirement);
  }

  dialogVisible: boolean = false;

  availableSemester: any[] | undefined;
  selectedSemesters: any;

  availableModules: ModuleDto[] | undefined;
  selectedModules: number[] = [];

  @Input() label!: string;
  @Input() caption!: string;

  @Input() requirement!: Requirement;
  @Output() requirementChange = new EventEmitter<Requirement>();
  onRequirementChange(requirement1: Requirement) {

    this.selectedSemesters = this.requirement.requiredSemesters != "" ? this.requirement.requiredSemesters.split(',') : [];
    this.selectedModules = this.requirement.modules.map(module => module.id);
    this.selectedModules = [...this.selectedModules];
    console.log(this.selectedModules);

    this.requirementChange.emit(requirement1);

  }

  loglog() {
    console.log(this.selectedModules)
  }
}
