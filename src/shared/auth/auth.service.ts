import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {
  private loginURL: string = environment.backendURL + "auth/login";

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    let task = this.http.post<LoginResponse>(this.loginURL, {
      username: username,
      password: password
    });

    task.subscribe(response => {
      localStorage.setItem('token', response.token)
    })
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}

export interface LoginResponse {
  token: string;
}
