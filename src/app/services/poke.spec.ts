import { TestBed } from '@angular/core/testing';

import { PokeService
 } from './poke';

describe('Poke', () => {
  let service: PokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
