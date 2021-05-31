import { TestBed } from '@angular/core/testing';

import { CreateTrackService } from './create-track.service';

describe('CreateTrackService', () => {
  let service: CreateTrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTrackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
