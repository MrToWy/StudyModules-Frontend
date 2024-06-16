import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SubModule} from "../module/module.service";

@Injectable({
  providedIn: 'root'
})
export class SubmoduleService {
  private submoduleURL: string = environment.backendURL + "submodules";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.submoduleURL);
  }

  getOne(id: number): Observable<SubModule> {
    return this.http.get<any>(this.submoduleURL + "/" + id);
  }
}
