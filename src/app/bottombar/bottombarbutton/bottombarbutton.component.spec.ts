import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottombarButtonComponent } from './bottombar-button.component';

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
