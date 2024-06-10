import { TestBed } from '@angular/core/testing';

import { ABtestService } from './abtest.service';

describe('ABtestService', () => {
  let service: ABtestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ABtestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
