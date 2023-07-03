import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { successGardGuard } from './success-gard.guard';

describe('successGardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => successGardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
