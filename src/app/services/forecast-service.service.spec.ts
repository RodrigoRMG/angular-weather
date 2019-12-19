import { TestBed } from '@angular/core/testing';

import { ForecastServiceService } from './forecast-service.service';

describe('ForecastServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForecastServiceService = TestBed.get(ForecastServiceService);
    expect(service).toBeTruthy();
  });
});
