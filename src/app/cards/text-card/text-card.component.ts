import {Component, Input} from '@angular/core';
import {ChartModule} from "primeng/chart";
import {DividerModule} from "primeng/divider";

@Component({
  selector: 'app-text-card',
  standalone: true,
  imports: [
    ChartModule,
    DividerModule
  ],
  templateUrl: './text-card.component.html',
  styleUrl: './text-card.component.sass'
})
export class TextCardComponent {

  @Input()
  title: string | undefined;

  @Input()
  text: string | undefined;

  @Input()
  columns: number | undefined;

  @Input()
  rows: number | undefined;
}
