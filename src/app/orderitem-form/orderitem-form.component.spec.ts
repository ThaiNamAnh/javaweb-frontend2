import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderitemFormComponent } from './orderitem-form.component';

describe('OrderitemFormComponent', () => {
  let component: OrderitemFormComponent;
  let fixture: ComponentFixture<OrderitemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderitemFormComponent]
    });
    fixture = TestBed.createComponent(OrderitemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
