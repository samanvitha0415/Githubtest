import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTrackViewComponent } from './approve-track-view.component';

describe('ApproveTrackViewComponent', () => {
  let component: ApproveTrackViewComponent;
  let fixture: ComponentFixture<ApproveTrackViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTrackViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTrackViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
