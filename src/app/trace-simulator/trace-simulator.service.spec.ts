import { TestBed } from '@angular/core/testing';

import { TraceSimulatorService } from './trace-simulator.service';

describe('TraceSimulatorService', () => {
  let service: TraceSimulatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraceSimulatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
