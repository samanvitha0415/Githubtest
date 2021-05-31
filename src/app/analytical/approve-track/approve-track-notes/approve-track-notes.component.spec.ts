import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveTrackNotesComponent } from './approve-track-notes.component';

describe('ApproveTrackNotesComponent', () => {
  let component: ApproveTrackNotesComponent;
  let fixture: ComponentFixture<ApproveTrackNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveTrackNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveTrackNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
