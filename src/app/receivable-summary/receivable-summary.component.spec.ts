import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivableSummaryComponent } from './receivable-summary.component';

describe('ReceivableSummaryComponent', () => {
  let component: ReceivableSummaryComponent;
  let fixture: ComponentFixture<ReceivableSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivableSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivableSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
