import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockerPage } from './locker.page';

describe('LockerPage', () => {
  let component: LockerPage;
  let fixture: ComponentFixture<LockerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
