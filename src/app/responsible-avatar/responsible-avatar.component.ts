import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class ResponsibleAvatarComponent implements OnInit, OnChanges {
  @Input() responsible: string = '';

  initials: string = '';

  ngOnInit(): void {
    this.updateInitials();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['responsible']) {
      this.updateInitials();
    }
  }

  private updateInitials(): void {
    if (this.responsible) {
      const names = this.responsible.split(' ');
      this.initials = names.length > 1 ? `${names[0].charAt(0)}${names[1].charAt(0)}` : `${names[0].charAt(0)}`;
    } else {
      this.initials = '';
    }
  }
}
