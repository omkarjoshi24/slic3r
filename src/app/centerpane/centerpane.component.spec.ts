/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/centerpane/centerpane.component.spec.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:37:53 pm
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

import { CenterPaneComponent } from './centerpane.component';

describe('CenterPaneComponent', () => {
  let component: CenterPaneComponent;
  let fixture: ComponentFixture<CenterPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenterPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenterPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
