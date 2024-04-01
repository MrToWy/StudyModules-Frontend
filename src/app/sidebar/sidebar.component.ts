import { Component } from '@angular/core';
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {AvatarModule} from "primeng/avatar";
import {StyleClassModule} from "primeng/styleclass";
import {RippleModule} from "primeng/ripple";
import {AuthService} from "../../shared/auth/auth.service";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    AvatarModule,
    StyleClassModule,
    RippleModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
  }
  sidebarVisible: boolean = true;

  logout() {
    this.authService.logout();
  }
}
