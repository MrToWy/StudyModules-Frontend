import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TextAutocompleteService {

  private autocompleteURL: string = environment.backendURL + "autocomplete";


  constructor(private http: HttpClient) {
  }

  public getAutocompleteSuggestions(languageId: number, column: string): Observable<string[]> {
    const url = `${this.autocompleteURL}/${languageId}?column=${column}`;
    return this.http.get<string[]>(url);
  }
}
