import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarModule, FormsModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'study-modules';
  date: any;
}
