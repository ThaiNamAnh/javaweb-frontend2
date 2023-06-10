import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../models/Customer';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent {
  id: number = 0;
  public CustomerForm :any = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    gender: new FormControl(''),
    date: new FormControl('')
  });

  constructor(private customerService: CustomerService,
    private router : Router,
    private myroute: ActivatedRoute){}

  ngOnInit(): void{

    const idParam = this.myroute.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    console.log('id = ', this.id);
    if(this.id>0){
      this.loadData(this.id);
    }
  }

  public onSubmit(){
    var cus: Customer = {
      firstName: this.CustomerForm.get('firstName').value,
      lastName: this.CustomerForm.get('lastName').value,
      email: this.CustomerForm.get('email').value,
      gender: this.CustomerForm.get('gender').value,
      address: this.CustomerForm.get('address').value,
      id: this.CustomerForm.get('id').value,
      order: [],
      // avatar: this.CustomerForm.get('avatar').value.replace('C:\\fakepath\\', './assets/images/'),
      // birthdate: new Date(2000,1,1),
      date: new Date().toLocaleDateString()

    };

    if(this.id>0){
      this.customerService.updateCustomer(this.id, cus as Customer).subscribe( (data) => {
        console.log('Cap nhat customer' + data);
        this.router.navigate(['']);
      });
    } else {
      this.customerService.addCustomer(cus as Customer).subscribe( (data) => {
        console.log('Them customer' + data);
        this.router.navigate(['']);
      });
    }


  }

  private loadData(id: number){
    console.log('load data', id);
    this.customerService.getCustomerById(id).subscribe((data)=> {
      console.log('get customer: ', data);

      for(const control in this.CustomerForm.controls){
        if(control){
          this.CustomerForm.controls[control].setValue(data[control]);
        }
      }
    });
  }

selectedFile: File | null | undefined;

fileUrl: string = '';

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
}

}
