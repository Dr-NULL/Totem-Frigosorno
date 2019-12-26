import { TestBed } from '@angular/core/testing';

import { RutService } from './rut.service';

describe('RutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RutService = TestBed.get(RutService);
    expect(service).toBeTruthy();
  });
});
