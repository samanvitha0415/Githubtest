import { TestBed } from '@angular/core/testing';

import { MimService } from './mim.service';

describe('MimService', () => {
  let service: MimService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MimService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
