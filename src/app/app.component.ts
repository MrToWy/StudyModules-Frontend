import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'study-modules';
  date: any;
}
