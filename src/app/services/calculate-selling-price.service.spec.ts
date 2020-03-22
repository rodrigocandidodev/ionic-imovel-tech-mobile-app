import { TestBed } from '@angular/core/testing';

import { CalculateSellingPriceService } from './calculate-selling-price.service';

describe('CalculateSellingPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculateSellingPriceService = TestBed.get(CalculateSellingPriceService);
    expect(service).toBeTruthy();
  });
});
