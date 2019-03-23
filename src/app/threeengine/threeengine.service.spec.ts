/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThreeEngineService } from './threeengine.service';

describe('Service: ThreeEngine', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThreeEngineService]
    });
  });

  it('should ...', inject([ThreeEngineService], (service: ThreeEngineService) => {
    expect(service).toBeTruthy();
  }));
});
