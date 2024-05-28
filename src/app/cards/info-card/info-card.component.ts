import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {AvatarModule} from "primeng/avatar";

@Component({
  selector: 'app-info-card',
  standalone: true,
  imports: [
    NgIf,
    AvatarModule
  ],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.sass'
})
export class InfoCardComponent {

  @Input()
  label: string | undefined;

  @Input()
  value: string | undefined;

  @Input()
  icon: string | undefined;

  @Input()
  avatarLabel: string | undefined;
}
