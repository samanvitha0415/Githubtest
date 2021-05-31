import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTrackSummaryComponent } from './approve-track-summary.component';

describe('ApproveTrackSummaryComponent', () => {
  let component: ApproveTrackSummaryComponent;
  let fixture: ComponentFixture<ApproveTrackSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTrackSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTrackSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
