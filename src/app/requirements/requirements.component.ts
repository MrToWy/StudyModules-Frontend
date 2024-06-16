import {Component, OnInit} from '@angular/core';
import {RequirementService} from "../../shared/requirement/requirement.service";
import {TableModule} from "primeng/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-requirements',
  standalone: true,
  imports: [
    TableModule
  ],
  templateUrl: './requirements.component.html',
  styleUrl: './requirements.component.sass'
})
export class RequirementsComponent implements OnInit{

  constructor(
    private requirementService: RequirementService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.requirementService.getAll().subscribe(data => {
      this.requirements = data;
    });
    }

  requirements: any[] = [];

  async onReqClick(requirement: any) {
    await this.router.navigate(['requirement', requirement.id]);
  }
}
