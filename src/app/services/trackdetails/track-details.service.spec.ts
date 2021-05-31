import { TestBed } from '@angular/core/testing';

import { TrackDetailsService } from './track-details.service';

describe('TrackDetailsService', () => {
  let service: TrackDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
