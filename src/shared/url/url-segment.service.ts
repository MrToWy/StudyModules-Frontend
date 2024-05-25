import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UrlSegmentService {

  constructor(private router: Router) { }

  getIdFromSegment(segment: string): string | undefined {
    const segments = this.router.url.split("/");
    const segmentIndex = segments.indexOf(segment);
    return segmentIndex !== -1 ? segments[segmentIndex + 1] : undefined;
  }
}
