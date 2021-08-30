import { TestBed } from '@angular/core/testing';

import { PostApiEndpointService } from './post-api-endpoint.service';

describe('PostApiEndpointService', () => {
  let service: PostApiEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostApiEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
