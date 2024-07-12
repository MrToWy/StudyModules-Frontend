import { Component } from '@angular/core';
import {SubmoduleTranslatorComponent} from "../submodule-translate/submodule-translator.component";
import {SubmoduleEditComponent} from "../submodule-edit/submodule-edit.component";

@Component({
  selector: 'app-submodule-detail',
  standalone: true,
  imports: [
    SubmoduleTranslatorComponent,
    SubmoduleEditComponent
  ],
  templateUrl: './submodule-detail.component.html',
  styleUrl: './submodule-detail.component.sass'
})
export class SubmoduleDetailComponent {

}
