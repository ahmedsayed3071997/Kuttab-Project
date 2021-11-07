import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteCartComponent } from './confirm-delete-cart.component';

describe('ConfirmDeleteCartComponent', () => {
  let component: ConfirmDeleteCartComponent;
  let fixture: ComponentFixture<ConfirmDeleteCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteCartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
