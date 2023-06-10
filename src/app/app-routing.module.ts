import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { OrderComponent } from './order/order.component';
import { OrderitemComponent } from './orderitem/orderitem.component';
import { OrderitemFormComponent } from './orderitem-form/orderitem-form.component';

const routes: Routes = [
  {path: '', component:CustomerComponent},
  {path: 'customer-form', component:CustomerFormComponent},
  {path: 'customer-form/:id', component:CustomerFormComponent},
  {path: 'customer/:id', component:OrderComponent},
  {path: 'order/:id', component:OrderitemComponent},
  {path: ':id/orderitem-form', component:OrderitemFormComponent},
  {path: ':id/orderitem-form/:orderItemId', component:OrderitemFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
