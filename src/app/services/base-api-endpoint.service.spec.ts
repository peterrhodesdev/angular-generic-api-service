import { TestBed } from '@angular/core/testing';

import { BaseApiEndpointService } from './base-api-endpoint.service';

describe('BaseApiEndpointService', () => {
  let service: BaseApiEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseApiEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
