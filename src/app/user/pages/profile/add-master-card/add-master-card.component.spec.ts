import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterCardComponent } from './add-master-card.component';

describe('AddMasterCardComponent', () => {
  let component: AddMasterCardComponent;
  let fixture: ComponentFixture<AddMasterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMasterCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMasterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
