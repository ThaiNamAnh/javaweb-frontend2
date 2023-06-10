import { Component } from '@angular/core';
import { Customer} from '../models/Customer';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { Order } from '../models/Order';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  public listCustomer: Customer[] = [];

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit(): void {


    this.customerService.getCustomer().subscribe( (data)=> {
      console.log(data);
      this.listCustomer = data;
    } );
  }

  public getListCustomer(){
    this.customerService.getCustomer().subscribe( (data) => {
      console.log(data);
      this.listCustomer = data;
    } )
  }


  public addCustomer() {
    this.router.navigate(['customer-form']);
  }

  public deleteCustomer(id: any){
    console.log('Customer id: '+id);
    this.customerService.deleteCustomer(Number(id)).subscribe( (data)=>{
      console.log('delete: ' +data);
    } )
    this.getListCustomer();
    location.reload();
  }


  public editCustomer(id: any) {
    this.router.navigate(['customer-form', id]);
  }

  selectedCustomer: Customer[] = [];

  deleteSelectedCustomer() {
    for (const customer of this.selectedCustomer) {
      this.deleteCustomer(customer.id);
    this.selectedCustomer = [];
    }
    location.reload();
  }

  toggleCustomerSelection(cus: Customer) {
    const index = this.selectedCustomer.findIndex(emp => emp.id === cus.id);
    if (index > -1) {
      // Nhân viên đã được chọn, hủy chọn
      this.selectedCustomer.splice(index, 1);
    } else {
      // Nhân viên chưa được chọn, thêm vào danh sách chọn
      this.selectedCustomer.push(cus);
    }
  }

  showOrders(id: any) {
    // Chuyển hướng đến trang đơn hàng với id khách hàng
    this.router.navigate(['customer/', id]);
  }

}
