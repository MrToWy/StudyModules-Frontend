import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ActivatedRoute, Router} from "@angular/router";
import {ModuleDto} from "../../shared/module/module.service";
import {CourseDto, CourseService} from "../../shared/course/course.service";

@Component({
  selector: 'app-modules',
  standalone: true,
    imports: [
        ButtonModule,
        RippleModule,
        SharedModule,
        TableModule
    ],
  providers: [CourseService],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.sass'
})
export class ModulesComponent {
    modules!: ModuleDto[];

    selectedModule!: ModuleDto;

    courseId!: number;
    course: CourseDto | undefined;

    constructor(private courseService: CourseService,
                private router: Router,
                private route: ActivatedRoute
                ) {}

    ngOnInit() {

      // get course id from url
      this.courseId = Number(this.router.url.split("/")[6]);
        this.courseService.get(this.courseId).subscribe((data) => {
            this.course = data;
            this.modules = data.modules;
        });
    }

    async selectModule(module: ModuleDto) {
        await this.router.navigate(['module', module.id], {relativeTo: this.route});
    }
}
