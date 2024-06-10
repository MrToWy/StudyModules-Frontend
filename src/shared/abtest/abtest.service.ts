import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ABtestService {

  constructor() { }

  get aActive(): boolean {
    const storedValue = localStorage.getItem('aActive');
    // If the value exists in localStorage, parse it as a boolean
    // If not, return the default value (true)
    return storedValue !== null ? JSON.parse(storedValue) : true;
  }

  set aActive(value: boolean) {
    // Store the boolean value as a string in localStorage
    localStorage.setItem('aActive', JSON.stringify(value));

    // refresh the page
    window.location.reload();
  }
}
