import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTrackComponent } from './approve-track.component';

describe('ApproveTrackComponent', () => {
  let component: ApproveTrackComponent;
  let fixture: ComponentFixture<ApproveTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
