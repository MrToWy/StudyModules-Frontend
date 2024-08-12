import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {

  private changelogURL: string = environment.backendURL + "changelog";

  constructor(private http: HttpClient) { }

  getAll(tableName: string, objectId: number) {
    return this.http.get<ChangelogDto[]>(this.changelogURL + "/" + tableName + "/" + objectId);
  }
}

export interface ChangelogDto {
  id: number;
  table: string;
  objectId: number;
  description: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  items: ChangelogItemDto[];
}

export interface ChangelogItemDto {
  field: string;
  oldValue: string;
  newValue: string;
}
