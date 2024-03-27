import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class LoginService {
  private loginURL: string = "http://ubuntu:3000/auth/login";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginURL, {
      username: username,
      password: password
    });
  }
}

export interface LoginResponse {
  token: string;
}
