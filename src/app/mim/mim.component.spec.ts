import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MIMComponent } from './mim.component';

describe('MIMComponent', () => {
  let component: MIMComponent;
  let fixture: ComponentFixture<MIMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MIMComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MIMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
