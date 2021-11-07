import { TestBed } from '@angular/core/testing';

import { RouteModuleService } from './route-module.service';

describe('RouteModuleService', () => {
  let service: RouteModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
