import { Injectable } from '@angular/core';
import {Message} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() {
    this.errors = [];
  }

  errors: Message[];
}
