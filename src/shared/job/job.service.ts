import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PdfStructureItem} from "../../app/pdf-structure/pdf-structure.component";

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

  createNew(languageId: number, degreeProgramId: number): Observable<CreateJobResponse>{
    return this.http.post<CreateJobResponse>(this.jobURL, {languageId: languageId, degreeProgramId: degreeProgramId});
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

  getStructure(): Observable<PdfStructureItem[]> {
    return this.http.get<PdfStructureItem[]>(this.jobURL + "/structure?moduleBased=true");
  }
}

export interface CreateJobResponse {
  guid: string;
}
