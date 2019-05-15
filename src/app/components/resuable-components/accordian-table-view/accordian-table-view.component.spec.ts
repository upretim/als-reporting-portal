import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordianTableViewComponent } from './accordian-table-view.component';

describe('AccordianTableViewComponent', () => {
  let component: AccordianTableViewComponent;
  let fixture: ComponentFixture<AccordianTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordianTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordianTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
