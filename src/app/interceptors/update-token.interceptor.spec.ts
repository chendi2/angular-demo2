import { TestBed } from '@angular/core/testing';

import { UpdateTokenInterceptor } from './update-token.interceptor';

describe('UpdateTokenInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UpdateTokenInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: UpdateTokenInterceptor = TestBed.inject(UpdateTokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
