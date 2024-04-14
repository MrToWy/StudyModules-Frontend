import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {Router} from "@angular/router";
import {ModuleDto, ModuleService} from "../../shared/module/module.service";

@Component({
  selector: 'app-modules',
  standalone: true,
    imports: [
        ButtonModule,
        RippleModule,
        SharedModule,
        TableModule
    ],
  providers: [ModuleService],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.sass'
})
export class ModulesComponent {
    modules!: ModuleDto[];

    selectedModule!: ModuleDto;
    courseId!: number;

    constructor(private moduleService: ModuleService,
                private router: Router) {}

    ngOnInit() {

      // get course id from url
      this.courseId = Number(this.router.url.split("/")[4]);

        this.moduleService.mockGetAllObservable(this.courseId).subscribe((data) => {
            this.modules = data;
        });
    }

    selectModule(module: ModuleDto) {
        this.router.navigate(['/faculty', module.facultyId, 'course', module.courseId, 'module', module.id]).then(r => console.log(r));
    }
}
