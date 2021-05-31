import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteTrackComponent } from './execute-track.component';

describe('ExecuteTrackComponent', () => {
  let component: ExecuteTrackComponent;
  let fixture: ComponentFixture<ExecuteTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecuteTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
