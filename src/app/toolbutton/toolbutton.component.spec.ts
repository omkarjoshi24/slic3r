/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/toolbar/toolbutton/toolbutton.component.spec.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:55:20 pm
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

import { ToolButtonComponent } from './toolbutton.component';

describe('ToolButtonComponent', () => {
  let component: ToolButtonComponent;
  let fixture: ComponentFixture<ToolButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
