import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteTrackSubComponent } from './execute-track-sub.component';

describe('ExecuteTrackSubComponent', () => {
  let component: ExecuteTrackSubComponent;
  let fixture: ComponentFixture<ExecuteTrackSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecuteTrackSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteTrackSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
