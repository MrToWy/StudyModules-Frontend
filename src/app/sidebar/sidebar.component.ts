import { Component } from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {StyleClassModule} from "primeng/styleclass";
import {RippleModule} from "primeng/ripple";
import {AuthService} from "../../shared/auth/auth.service";
import {NgIf} from "@angular/common";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {PasswordModule} from "primeng/password";
import {TranslocoDirective} from "@jsverse/transloco";
import {PanelModule} from "primeng/panel";
import {RouterLink} from "@angular/router";
import {TooltipModule} from "primeng/tooltip";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    AvatarModule,
    StyleClassModule,
    RippleModule,
    NgIf,
    InputTextModule,
    DialogModule,
    FormsModule,
    PasswordModule,
    TranslocoDirective,
    PanelModule,
    RouterLink,
    TooltipModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
  protected authService: AuthService;
  protected username: string | undefined;
  protected password: string | undefined;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
  sidebarVisible: boolean = false;
  loginDialogVisible: boolean = false;

  logout() {
    this.authService.logout();
  }

  async showLogin() {
    this.loginDialogVisible = true;
    this.sidebarVisible = false;
  }

   protected login(){
    this.authService.login(this.username??"", this.password??"");
    this.loginDialogVisible = false;
  }

  onKeydown($event: KeyboardEvent) {
    if ($event.key === "Enter") {
      this.login();
    }
  }
}
