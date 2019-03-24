/* tslint:disable:no-unused-variable */
/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/threeengine/threeengine.service.spec.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 6:51:51 pm
 * Author: Omkar Joshi
 * -----
 * Last Modified: Sun Mar 24 2019
 * Modified By: Omkar Joshi
 * -----
 * Copyright (c) 2019 Omkar Joshi
 * 
 * <<licensetext>>
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 */


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
