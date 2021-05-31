import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloneTrackReviewComponent } from './clone-track-review.component';

describe('CloneTrackReviewComponent', () => {
  let component: CloneTrackReviewComponent;
  let fixture: ComponentFixture<CloneTrackReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloneTrackReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneTrackReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
