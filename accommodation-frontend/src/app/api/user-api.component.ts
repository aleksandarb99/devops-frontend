import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class UserApiServiceComponent {
            
  constructor(public http: HttpClient) {
   }

  signup(data: any): Observable<any> {
    return this.http.post(`${env.API_URL}/api/v1/user`, data)
  }

  updateUser(data: any): Observable<any> {
    console.log(data);
    return this.http.put(`${env.API_URL}/api/v1/user`, data)
  }

  getUser(): Observable<any> {
    return this.http.get(`${env.API_URL}/api/v1/user/user-details`)
  }

  deleteUser(): Observable<any> {
    return this.http.delete(`${env.API_URL}/api/v1/user`)
  }
}
