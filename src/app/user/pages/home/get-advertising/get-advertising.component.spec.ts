import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAdvertisingComponent } from './get-advertising.component';

describe('GetAdvertisingComponent', () => {
  let component: GetAdvertisingComponent;
  let fixture: ComponentFixture<GetAdvertisingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAdvertisingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAdvertisingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
