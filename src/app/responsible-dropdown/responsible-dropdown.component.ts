import {Component, Input} from '@angular/core';
import {DropdownChangeEvent, DropdownModule} from "primeng/dropdown";
import {NgIf} from "@angular/common";
import {ResponsibleAvatarComponent} from "../responsible-avatar/responsible-avatar.component";
import {SharedModule} from "primeng/api";
import {FormsModule} from "@angular/forms";
import {ModuleDetail} from "../../shared/module/module.service";
import {UserDto} from "../../shared/user/user.service";
import {InputNumberModule} from "primeng/inputnumber";

@Component({
  selector: 'app-responsible-dropdown',
  standalone: true,
  imports: [
    DropdownModule,
    NgIf,
    ResponsibleAvatarComponent,
    SharedModule,
    FormsModule,
    InputNumberModule
  ],
  templateUrl: './responsible-dropdown.component.html',
  styleUrl: './responsible-dropdown.component.sass'
})
export class ResponsibleDropdownComponent {

  constructor() {
  }

  @Input()
  module!: ModuleDetail;

  @Input()
  users!: UserDto[];

  responsibleChange($event: DropdownChangeEvent) {
    this.module.responsibleId = $event.value.id;
  }
}
