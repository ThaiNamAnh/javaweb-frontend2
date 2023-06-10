import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItem } from '../models/OrderItem';
import { OrderitemService } from '../service/orderitem.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orderitem-form',
  templateUrl: './orderitem-form.component.html',
  styleUrls: ['./orderitem-form.component.css']
})
export class OrderitemFormComponent {
  id: number = 0;
  orderItemId:number = 0;
  public OrderItemForm :any = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    price: new FormControl(''),
    imageUrl: new FormControl('')
  });

  constructor(private orderitemService: OrderitemService,
    private myroute: ActivatedRoute,
    private location: Location){}

    ngOnInit(): void{

      const idParam = this.myroute.snapshot.paramMap.get('id');
      this.id = idParam ? +idParam : 0;
      console.log('id = ', this.id);
      // if(this.id>0){
      //   this.loadData(this.id);
      // }

      const idParam2 = this.myroute.snapshot.paramMap.get('orderItemId');
      this.orderItemId = idParam2 ? +idParam2 : 0;
      console.log('orderItemId = ', this.orderItemId);
      if(this.orderItemId>0){
        this.loadData(this.orderItemId);
      }
    }

    private loadData(orderItemId: number){
      console.log('load data', orderItemId);
      this.orderitemService.getOderItemById(orderItemId).subscribe((data)=> {
        console.log('get customer: ', data);

        for(const control in this.OrderItemForm.controls){
          if(control){
            this.OrderItemForm.controls[control].setValue(data[control]);
          }
        }
      });
    }

    public onSubmit(){
      var cus: OrderItem = {
        name: this.OrderItemForm.get('name').value,
        price: this.OrderItemForm.get('price').value,
        imageUrl: this.OrderItemForm.get('imageUrl').value,
        id: this.OrderItemForm.get('id').value,
        orderId: "",
        // avatar: this.CustomerForm.get('avatar').value.replace('C:\\fakepath\\', './assets/images/'),
        // birthdate: new Date(2000,1,1),
        // date: new Date().toLocaleDateString()
      };

      if(this.orderItemId>0){
        this.orderitemService.updateOrderItemofOrder(this.id, cus as OrderItem, this.orderItemId).subscribe( (data) => {
          console.log('Cap nhat customer' + data);
          this.location.back();
        });
      } else {
        this.orderitemService.addOrderItemofOrder(cus as OrderItem, this.id).subscribe( (data) => {
          console.log('Them customer' + data);
          this.location.back();
        });
      }
    }

}

