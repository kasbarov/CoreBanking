import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecCustomerComponent } from './createc-customer.component';

describe('CreatecCustomerComponent', () => {
  let component: CreatecCustomerComponent;
  let fixture: ComponentFixture<CreatecCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatecCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatecCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
