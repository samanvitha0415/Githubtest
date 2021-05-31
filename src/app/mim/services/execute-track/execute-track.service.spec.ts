import { TestBed } from '@angular/core/testing';

import { ExecuteTrackService } from './execute-track.service';

describe('ExecuteTrackService', () => {
  let service: ExecuteTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExecuteTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
