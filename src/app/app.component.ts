import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {NgIf} from "@angular/common";
import {AuthService} from "../shared/auth/auth.service";
import {AuthModule} from "../shared/auth/auth.module";
import {MainComponent} from "./main/main.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarModule, FormsModule, LoginComponent, NgIf, AuthModule, MainComponent],
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'study-modules';
  date: any;

  constructor(protected authService: AuthService) {
  }
}
