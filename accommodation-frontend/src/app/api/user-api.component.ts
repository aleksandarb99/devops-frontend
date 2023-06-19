import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserApiServiceComponent {
  headers = new HttpHeaders();
            
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer your_token_here');
   }

  signup(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/user', data)
  }

  updateUser(data: any): Observable<any> {
    console.log(data);
    return this.http.put('http://localhost:8080/api/v1/user', data)
  }

  getUser(id: number): Observable<any> {
    return this.http.get('http://localhost:8080/api/v1/user/' + id)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete('http://localhost:8080/api/v1/user/' + id)
  }
}
