import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CloneTrackComponent } from "./clone-track.component";

describe("CloneTrackComponent", () => {
  let component: CloneTrackComponent;
  let fixture: ComponentFixture<CloneTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloneTrackComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloneTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
