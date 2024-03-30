import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {environment} from "../../environment";

@Injectable()
export class LoginService {
  private loginURL: string = environment.backendURL + "auth/login";

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
