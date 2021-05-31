import { TestBed } from '@angular/core/testing';

import { ViewtracklistService } from './viewtracklist.service';

describe('ViewtracklistService', () => {
  let service: ViewtracklistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewtracklistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
