/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/bottombar/bottombarbutton/bottombarbutton.component.spec.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:56:43 pm
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

import { BottombarButtonComponent } from './bottombarbutton.component';

describe('BottombarButtonComponent', () => {
  let component: BottombarButtonComponent;
  let fixture: ComponentFixture<BottombarButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottombarButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottombarButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
