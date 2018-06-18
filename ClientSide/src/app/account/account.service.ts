import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {
  
  
  // deposit money by calling the server
  deposit(depositInfo:{}): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        
      })
    };
    return this.http.post<string>('http://localhost:3000/customers/deposit', depositInfo, httpOptions);
  }

  constructor(private http: HttpClient) { }




  // get customer info from backend using ssn
  // http://localhost:3000/customers/1111
  getCustmer(ssn : String) {
    console.log('going to call' + ssn);
    return this.http.get<{}>('http://localhost:3000/customers/'+ssn);
  }

   // save customer in the backend
   createAccount(account: {}): Observable<string> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        
      })
    };
    return this.http.post<string>('http://localhost:3000/customers/createAccount', account, httpOptions);
  };

  
}