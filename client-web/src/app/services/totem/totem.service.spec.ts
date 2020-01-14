import { TestBed } from '@angular/core/testing';

import { TotemService } from './totem.service';

describe('TotemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotemService = TestBed.get(TotemService);
    expect(service).toBeTruthy();
  });
});
