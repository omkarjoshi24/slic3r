/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/bottombar/bottombar.component.spec.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:38:19 pm
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottombarComponent } from './bottombar.component';

describe('BottombarComponent', () => {
  let component: BottombarComponent;
  let fixture: ComponentFixture<BottombarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottombarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottombarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
