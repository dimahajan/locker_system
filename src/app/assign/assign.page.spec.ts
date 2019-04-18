import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignPage } from './assign.page';

describe('AssignPage', () => {
  let component: AssignPage;
  let fixture: ComponentFixture<AssignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
