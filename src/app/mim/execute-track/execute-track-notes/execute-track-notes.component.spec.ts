import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteTrackNotesComponent } from './execute-track-notes.component';

describe('ExecuteTrackNotesComponent', () => {
  let component: ExecuteTrackNotesComponent;
  let fixture: ComponentFixture<ExecuteTrackNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecuteTrackNotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteTrackNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
