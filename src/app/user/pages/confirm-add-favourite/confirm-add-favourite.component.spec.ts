import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddFavouriteComponent } from './confirm-add-favourite.component';

describe('ConfirmAddFavouriteComponent', () => {
  let component: ConfirmAddFavouriteComponent;
  let fixture: ComponentFixture<ConfirmAddFavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmAddFavouriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAddFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
