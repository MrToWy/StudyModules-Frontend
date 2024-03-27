import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {LoginService} from "./login.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    PasswordModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
  providers: [LoginService]
})
export class LoginComponent {

  username: any;
  password: any;

  constructor(private loginService: LoginService) {
  }

  protected login(){
    console.log(this.username);

    this.loginService.login(this.username, this.password)
    // clone the data object, using its known Config shape
    .subscribe(data => localStorage.setItem('token', {...data }.token));
  }
}
