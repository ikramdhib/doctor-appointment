import { TestBed } from '@angular/core/testing';

import { DoctorServesService } from './doctor-serves.service';

describe('DoctorServesService', () => {
  let service: DoctorServesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorServesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
