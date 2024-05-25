import { TestBed } from '@angular/core/testing';

import { TextAutocompleteService } from './text-autocomplete.service';

describe('TextAutocompleteService', () => {
  let service: TextAutocompleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextAutocompleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
