import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {DividerModule} from "primeng/divider";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {AuthService} from "../../shared/auth/auth.service";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass',
  providers: [AuthService]
})
export class LoginComponent {

  username: any;
  password: any;

  constructor(private authService: AuthService) {
  }

  protected login(){
    this.authService.login(this.username, this.password);
  }
}
