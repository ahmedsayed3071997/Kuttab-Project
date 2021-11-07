import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteCardComponent } from './confirm-delete-card.component';

describe('ConfirmDeleteCardComponent', () => {
  let component: ConfirmDeleteCardComponent;
  let fixture: ComponentFixture<ConfirmDeleteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
