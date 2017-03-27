import { TestBed, inject } from '@angular/core/testing';

import { HealthProfileService } from './health-profile.service';

describe('HealthProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthProfileService]
    });
  });

  it('should ...', inject([HealthProfileService], (service: HealthProfileService) => {
    expect(service).toBeTruthy();
  }));
});
