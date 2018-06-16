import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }


  // save customer in the backend
  createCustomer(customer: {}): Observable<string> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        
      })
    };
    return this.http.post<string>('http://localhost:3000/customers/createCustomer', customer, httpOptions);
  };

  //'Authorization': 'my-auth-token'

  // get all customers from backend
  getAllCustmer() {
    return this.http.get<{}[]>('http://localhost:3000/customers/');
  }

  
}
