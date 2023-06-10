import { Component } from '@angular/core';
import { Customer} from '../models/Customer';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { OrderService } from '../service/order.service';
import { OrderitemService } from '../service/orderitem.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderitem',
  templateUrl: './orderitem.component.html',
  styleUrls: ['./orderitem.component.css']
})

export class OrderitemComponent {
  public listOrderItem:OrderItem[] = [];
  constructor(private customerService: CustomerService, private orderitemService: OrderitemService, private router: Router,private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const customerId = +idParam;
      this.orderitemService.getOrderItemofOrder(customerId).subscribe((data) => {
        console.log(data);
        this.listOrderItem = data;
      });
    }
  }

  id = this.route.snapshot.paramMap.get('id');

  // addOrderItem() {
  //   const orderid = this.route.snapshot.paramMap.get('id');
  //   this.orderitemService.addOrderItem(orderid, orderItem).subscribe(
  //     response => {
  //       console.log('Thêm mới orderItem thành công', response);
  //       // Cập nhật lại danh sách orderItems hoặc thực hiện các hành động khác tùy theo logic của bạn
  //     },
  //     error => {
  //       console.error('Lỗi khi thêm mới orderItem', error);
  //     }
  //   );
  // }

  public getListOrderItem(){
    this.orderitemService.getOderItem().subscribe( (data) => {
      console.log(data);
      this.listOrderItem = data;
    } )
  }

  public getListOrderItemEachOrder(){
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const customerId = +idParam;
      this.orderitemService.getOrderItemofOrder(customerId).subscribe((data) => {
        console.log(data);
        this.listOrderItem = data;
      });
  }
}


  // public getListOrder(id: any){
  //   this.orderService.getOrderById(id).subscribe( (data) => {
  //     console.log(data);
  //     this.listOrder = data.order;
  //   } )
  // }

  public addOderItem(id:any) {
    this.router.navigate([id,'orderitem-form']);
  }

  public editOderItem(orderItemId:any) {
    this.router.navigate([this.id,'orderitem-form',orderItemId]);
  }

  public deleteOrderItem(id: any){
    console.log('Order id: '+id);
    this.orderitemService.deleteOderItem(Number(id)).subscribe( (data)=>{
      console.log('delete: ' +data);
    } )
    this.getListOrderItemEachOrder();
    location.reload();
  }

    // public editCustomer(id: any) {
  //   this.router.navigate(['customer-form', id]);
  // }

  selectedOrderItem: OrderItem[] = [];

  deleteSelectedOrderItem() {
    for (const order of this.selectedOrderItem) {
      this.deleteOrderItem(order.id);
    this.selectedOrderItem = [];
    }
    location.reload();
  }

  toggleOrderSelection(cus: OrderItem) {
    const index = this.selectedOrderItem.findIndex(emp => emp.id === cus.id);
    if (index > -1) {
      // Nhân viên đã được chọn, hủy chọn
      this.selectedOrderItem.splice(index, 1);
    } else {
      // Nhân viên chưa được chọn, thêm vào danh sách chọn
      this.selectedOrderItem.push(cus);
    }
  }

  back() {
    this.router.navigate(['/customer', this.id]);
  }
}
