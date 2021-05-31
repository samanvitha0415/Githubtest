import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlEditComponent } from './xml-edit.component';

describe('XmlEditComponent', () => {
  let component: XmlEditComponent;
  let fixture: ComponentFixture<XmlEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XmlEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XmlEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
