import { Component } from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {DropdownModule} from "primeng/dropdown";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {TranslocoDirective} from "@jsverse/transloco";
import {FormsModule} from "@angular/forms";
import {CourseDto} from "../../shared/course/course.service";
import {LanguageService} from "../../shared/language/language.service";
import {SubmoduleService} from "../../shared/submodule/submodule.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-submodules',
  standalone: true,
  imports: [
    AvatarModule,
    DropdownModule,
    SharedModule,
    TableModule,
    TranslocoDirective,
    FormsModule
  ],
  templateUrl: './submodules.component.html',
  styleUrl: './submodules.component.sass'
})
export class SubmodulesComponent {

  submodules!: any[];
  users!: any[];
  statuses!: any[];
  selectedUser: any;
  course: CourseDto | undefined;


  constructor(
    private languageService : LanguageService,
    private submoduleService: SubmoduleService,
    private router : Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
      this.loadData();

    this.languageService.languageSubject.subscribe(() => {
      this.loadData()
    });
  }


  loadData(){
    this.submoduleService.getAll().subscribe(submodules => {
      this.submodules = submodules;
    });
  }

  async openDetailView(submodule: any) {
    await this.router.navigate([submodule.id], {relativeTo: this.route});
  }
}
