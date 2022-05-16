import { TestBed } from '@angular/core/testing';

import { SelectInputDataProviderService } from './select-input-data-provider.service';

describe('SelectInputDataProviderService', () => {
  let service: SelectInputDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectInputDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
