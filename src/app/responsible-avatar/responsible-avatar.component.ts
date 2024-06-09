import {Component, Input, OnInit} from '@angular/core';
import {AvatarModule} from "primeng/avatar";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-responsible-avatar',
  standalone: true,
  imports: [
    AvatarModule,
    NgIf
  ],
  templateUrl: './responsible-avatar.component.html',
  styleUrl: './responsible-avatar.component.sass'
})
export class ResponsibleAvatarComponent implements OnInit{
  @Input() responsible: string = '';

  initials: string = '';

  ngOnInit(): void {
    if (this.responsible) {
      const names = this.responsible.split(' ');
      this.initials = names.length > 1 ? `${names[0].charAt(0)}${names[1].charAt(0)}` : `${names[0].charAt(0)}`;
    }
  }
}
