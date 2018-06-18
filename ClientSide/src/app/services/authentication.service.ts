import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { error } from 'util';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        console.log('authenticationService.login ..');
        return this.http.post<any>('http://localhost:3000/users/authenticate', { username: username, password: password })
            .pipe(map((res:any) => {
              
                console.log(res);
                // login successful if there's a jwt token in the response
                if (res && res.token) {
                    console.log('login successful with token');
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username, token: res.token }));
                }else{
                   throw ('Invalid Credentials');
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}