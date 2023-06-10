import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderItem } from '../models/OrderItem';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {
  deleteOderItem1(id: string) {
    throw new Error('Method not implemented.');
  }
  private REST_API_SERVER_ORDERITEM = "http://localhost:8080/api";
  constructor(private httpClient: HttpClient) { }

  public getOrderItemofOrder(orderId: number):Observable<any> {
    const url = this.REST_API_SERVER_ORDERITEM+ '/orders/'+orderId+'/orderItems';
    return this.httpClient.get<any>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  // public addOrderItemofOrder(data: OrderItem, id: number): Observable<any> {
  //   const url = this.REST_API_SERVER_ORDERITEM + "/orders/"+id+'/orderItems';
  //   return this.httpClient.post<any>(url, data, httpOptions)
  //   .pipe(catchError(this.handleError));
  // }

  addOrderItemofOrder(orderItem: OrderItem, orderId: number): Observable<any> {
    const url = `${this.REST_API_SERVER_ORDERITEM}/orders/${orderId}/orderItems`;
    return this.httpClient.post<any>(url, orderItem);
  }

  public updateOrderItemofOrder(orderId: number, orderItem: OrderItem, orderItemId:number):Observable<any> {
    const url = this.REST_API_SERVER_ORDERITEM+ '/orders/'+orderId+'/orderItems/'+orderItemId;
    return this.httpClient.put<any>(url, orderItem, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getOderItem(): Observable<any> {
    const url = this.REST_API_SERVER_ORDERITEM+"/orderItems";
    return this.httpClient.get<any>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getOderItemById(id:number): Observable<any> {
    const url = this.REST_API_SERVER_ORDERITEM + "/orderItems/" + id;
    return this.httpClient.get<any>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  // public addOrder(data: Order): Observable<any> {
  //   const url = this.REST_API_SERVER_ORDERITEM + "/orders";
  //   return this.httpClient.post<any>(url, data, httpOptions)
  //   .pipe(catchError(this.handleError));
  // }

  public deleteOderItem(orderItemId: number): Observable<any> {
    const url = this.REST_API_SERVER_ORDERITEM + "/orderItems/" + orderItemId;
    return this.httpClient.delete<any>(url)
    .pipe(catchError(this.handleError));
  }

  // public updateOrder(id: number, data: Order): Observable<any> {
  //   const url = this.REST_API_SERVER_ORDER+ "/orders";
  //   return this.httpClient.put<any>(url, data, httpOptions)
  //   .pipe(catchError(this.handleError));
  // }

  private handleError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, `+ `body was: ${error.error}`
      );
    }
    return throwError('St bad happend; plz try again later.');
  }
}
