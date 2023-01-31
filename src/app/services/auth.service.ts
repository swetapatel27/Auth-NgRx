import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getToken(): string {
    return (localStorage.getItem('token') || '');
  }


  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/api/v1/auth/login`;
    return this.http.post<User>(url, {email, password});
  }

  signUp(data:any): Observable<User> {
    console.log("from service",data);
    const url = `${this.BASE_URL}/api/v1/auth/signup`;
    return this.http.post<User>(url,data);
  }


}
