import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteFavouriteComponent } from './confirm-delete-favourite.component';

describe('ConfirmDeleteFavouriteComponent', () => {
  let component: ConfirmDeleteFavouriteComponent;
  let fixture: ComponentFixture<ConfirmDeleteFavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteFavouriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
