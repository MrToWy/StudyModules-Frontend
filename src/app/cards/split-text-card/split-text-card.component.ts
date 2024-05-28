import {Component, Input} from '@angular/core';
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'app-split-text-card',
  standalone: true,
  imports: [
    DividerModule
  ],
  templateUrl: './split-text-card.component.html',
  styleUrl: './split-text-card.component.sass'
})
export class SplitTextCardComponent {

  @Input()
  title: string | undefined;

  @Input()
  leftText: string | undefined;

  @Input()
  rightText: string | undefined;

  @Input()
  leftCaption: string | undefined;

  @Input()
  rightCaption: string | undefined;

  @Input()
  columns: number | undefined;

  @Input()
  rows: number | undefined;
}
