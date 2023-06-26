import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationApiService {

  constructor(public http: HttpClient) { }

  createReservation(data: any): Observable<any> {
    return this.http.post(`${env.API_URL}/api/v1/reservation`, data);
  }

  getBookedAccommodation(): Observable<any> {
    let status = "APPROVED";
    return this.http.get(`${env.API_URL}/api/v1/reservation/by-user-and-status?status=${status}`,);
  //return this.http.get(``)

    //"/by-accommodation-and-status/{accommodationId}"
  }
}
