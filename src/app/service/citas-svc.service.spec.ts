import { TestBed } from '@angular/core/testing';

import { CitasSvcService } from './citas-svc.service';

describe('CitasSvcService', () => {
  let service: CitasSvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitasSvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
