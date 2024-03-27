import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";

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
  styleUrl: './login.component.sass'
})
export class LoginComponent {
  username: any;
  password: any;


  protected login(){
    console.log(this.username);
  }
}
