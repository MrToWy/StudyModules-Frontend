import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private jobURL: string = environment.backendURL + "job";

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.jobURL);
  }

  getAllFiltered(filterGuids: string[]): Observable<any[]> {
    return this.http.get<any[]>(this.jobURL + "?filterGuids=" + filterGuids.join(","));
  }

  createNew(languageId: number, degreeProgramId: number){
    return this.http.post(this.jobURL, {languageId: languageId, degreeProgramId: degreeProgramId});
  }

  getOne(guid: string){
    return this.http.get(this.jobURL + "/" + guid);
  }

  publish(guid: string) {
    return this.http.patch(this.jobURL + "/" + guid + "/publish", {});
  }

  delete(guid: string) {
    return this.http.delete(this.jobURL + "/" + guid);
  }
}
