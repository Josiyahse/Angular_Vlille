import { TestBed } from '@angular/core/testing';

import { VLilleDataService } from './vlille-data.service';

describe('VLilleDataService', () => {
  let service: VLilleDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VLilleDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
