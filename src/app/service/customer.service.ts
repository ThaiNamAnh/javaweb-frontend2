import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Customer } from '../models/Customer';


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})


export class CustomerService {
  id(id: any) {
    throw new Error('Method not implemented.');
  }
  deleteCustomer1(id: string) {
    throw new Error('Method not implemented.');
  }
  private REST_API_SERVER_EMPLOYEES = "http://localhost:8080/api/customers";
  constructor(private httpClient: HttpClient) { }
  public getCustomer(): Observable<any> {
    const url = this.REST_API_SERVER_EMPLOYEES;
    return this.httpClient.get<any>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public getCustomerById(id:number): Observable<any> {
    const url = this.REST_API_SERVER_EMPLOYEES + "/" + id;
    return this.httpClient.get<any>(url, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public addCustomer(data: Customer): Observable<any> {
    const url = this.REST_API_SERVER_EMPLOYEES;
    return this.httpClient.post<any>(url, data, httpOptions)
    .pipe(catchError(this.handleError));
  }

  public deleteCustomer(employeeId: number): Observable<any> {
    const url = this.REST_API_SERVER_EMPLOYEES + "/" + employeeId;
    return this.httpClient.delete<any>(url)
    .pipe(catchError(this.handleError));
  }

  public updateCustomer(id: number, data: Customer): Observable<any> {
    const url = this.REST_API_SERVER_EMPLOYEES;
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
