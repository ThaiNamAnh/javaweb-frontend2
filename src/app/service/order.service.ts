import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/Order';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  deleteOder1(id: string) {
    throw new Error('Method not implemented.');
  }
  private REST_API_SERVER_ORDER = "http://localhost:8080/api";
  constructor(private httpClient: HttpClient) { }

  public getOrderofCustomer(id: number):Observable<any> {
    const url = this.REST_API_SERVER_ORDER+ '/customers/'+id+'/orders';
    return this.httpClient.get<any>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }


  public getOrder(): Observable<any> {
    const url = this.REST_API_SERVER_ORDER+"/orders";
    return this.httpClient.get<any>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getOrderById(id:number): Observable<any> {
    const url = this.REST_API_SERVER_ORDER + "/orders/" + id;
    return this.httpClient.get<any>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public addOrder(data: Order, customerId:number): Observable<any> {
    const url = this.REST_API_SERVER_ORDER+ '/customers/'+customerId+'/orders';
    return this.httpClient.post<any>(url, data);
  }

  public deleteOrder(orderId: number): Observable<any> {
    const url = this.REST_API_SERVER_ORDER + "/orders/" + orderId;
    return this.httpClient.delete<any>(url)
    .pipe(catchError(this.handleError));
  }

  public updateOrder(id: number,data: Order,orderId:number): Observable<any> {
    const url = this.REST_API_SERVER_ORDER+ '/customers/'+id+'/orders/'+orderId;
    return this.httpClient.put<any>(url, data, httpOptions)
    .pipe(catchError(this.handleError));
  }


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
