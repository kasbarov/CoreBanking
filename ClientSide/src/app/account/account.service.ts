import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }




  // get customer from backend
  // http://localhost:3000/customers/1111
  getCustmer(id : String) {
    console.log('going to call' + id);
    return this.http.get<{}>('http://localhost:3000/customers/'+id);
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