import { TestBed } from '@angular/core/testing';

import { UrlSegmentService } from './url-segment.service';

describe('UrlSegmentService', () => {
  let service: UrlSegmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlSegmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
