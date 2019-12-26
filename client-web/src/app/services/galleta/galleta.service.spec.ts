import { TestBed } from '@angular/core/testing';

import { GalletaService } from './galleta.service';

describe('GalletaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GalletaService = TestBed.get(GalletaService);
    expect(service).toBeTruthy();
  });
});
