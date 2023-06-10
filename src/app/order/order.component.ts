import { Component } from '@angular/core';
import { Customer} from '../models/Customer';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { Order } from '../models/Order';
import { OrderService } from '../service/order.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})



export class OrderComponent {
  order: Order | undefined;
  public listOrder:Order[] = [];
  constructor(private customerService: CustomerService, private orderService: OrderService, private router: Router,private route: ActivatedRoute, private http: HttpClient ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const customerId = +idParam;
      this.orderService.getOrderofCustomer(customerId).subscribe((data) => {
        console.log(data);
        this.listOrder = data;
      });

    }
  }


  id = Number(this.route.snapshot.paramMap.get('id'));

  public getListOrder(){
    this.orderService.getOrder().subscribe( (data) => {
      console.log(data);
      this.listOrder = data;
    } )
  }

  public getListOrderEachCustomer(){
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam !== null) {
      const customerId = +idParam;
      this.orderService.getOrderofCustomer(customerId).subscribe((data) => {
        console.log(data);
        this.listOrder = data;
      });
  }
}



  // public getListOrder(id: any){
  //   this.orderService.getOrderById(id).subscribe( (data) => {
  //     console.log(data);
  //     this.listOrder = data.order;
  //   } )
  // }

  // public addCustomer() {
  //   this.router.navigate(['customer-form']);
  // }

  public deleteOrder(id: any){
    console.log('Order id: '+id);
    this.orderService.deleteOrder(Number(id)).subscribe( (data)=>{
      console.log('delete: ' +data);
    } )
    this.getListOrderEachCustomer();
    location.reload();
  }


  // public editCustomer(id: any) {
  //   this.router.navigate(['customer-form', id]);
  // }

  selectedOrder: Order[] = [];

  deleteSelectedOrder() {
    for (const order of this.selectedOrder) {
      this.deleteOrder(order.id);
    this.selectedOrder = [];
    }
    location.reload();
  }

  toggleOrderSelection(cus: Order) {
    const index = this.selectedOrder.findIndex(emp => emp.id === cus.id);
    if (index > -1) {
      // Nhân viên đã được chọn, hủy chọn
      this.selectedOrder.splice(index, 1);
    } else {
      // Nhân viên chưa được chọn, thêm vào danh sách chọn
      this.selectedOrder.push(cus);
    }
  }

  showOrderItem(ID: any) {
    // Chuyển hướng đến trang đơn hàng với id khách hàng
    this.router.navigate(['order/', ID]);
  }


  updateOrderItem(id:number,order: Order, orderId:number) {
    // Tính toán Total Quantity và Total Price của Order Item
    order.totalQuantity = 0;
    order.totalPrice = 0;
    for (const item of order.orderItems) {
      order.totalQuantity += 1;
      order.totalPrice += item.price;
    }
    // Gọi phương thức trong OrderService để cập nhật thông tin Order Item lên API
    this.orderService.updateOrder(id, order, orderId).subscribe(() => {
      // Sau khi cập nhật thành công, gọi lại phương thức để cập nhật lại thông tin đơn hàng
      this.getListOrderEachCustomer();
    });
  }


  public addOrder(){
    var order: Order = {
      totalQuantity: 0,
      totalPrice: 0,
      dateCreated: new Date(),
      orderItems: [],
      // avatar: this.CustomerForm.get('avatar').value.replace('C:\\fakepath\\', './assets/images/'),
      // birthdate: new Date(2000,1,1),
      // date: new Date().toLocaleDateString()

      id: '',
      customerId: ''
    };
    const id = Number(this.route.snapshot.paramMap.get('id'));
      this.orderService.addOrder(order, id).subscribe( (data) => {
        console.log('Them customer' + data);
    })
    location.reload();
  }
}
