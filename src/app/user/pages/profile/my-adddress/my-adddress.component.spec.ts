import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAdddressComponent } from './my-adddress.component';

describe('MyAdddressComponent', () => {
  let component: MyAdddressComponent;
  let fixture: ComponentFixture<MyAdddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAdddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAdddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
