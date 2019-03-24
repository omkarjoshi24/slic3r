/**
 * File: /Users/omkarjoshi/Development/slic3r/src/app/menubar/menubutton/menubutton.component.spec.ts
 * Project: slic3r
 * Created Date: Friday, March 22nd 2019, 5:56:11 pm
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

import { MenuButtonComponent } from './menubutton.component';

describe('MenuButtonComponent', () => {
  let component: MenuButtonComponent;
  let fixture: ComponentFixture<MenuButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
