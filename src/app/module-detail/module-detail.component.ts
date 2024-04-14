import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-module-detail',
  standalone: true,
  imports: [
    ButtonModule
  ],
  templateUrl: './module-detail.component.html',
  styleUrl: './module-detail.component.sass'
})
export class ModuleDetailComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  async switchToEditMode() {
    await this.router.navigate(["edit"], {relativeTo: this.route});
  }
}
