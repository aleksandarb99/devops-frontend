import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getBookedAccommodation(): Observable<any> {
    return this.http.get(`${env.API_URL}/api/v1/reservation/approved`);
  }

  fetchUncheckedReservations() {
    return this.http.get(`${env.API_URL}/api/v1/reservation/requested`);
  }

  createReservation(data: any): Observable<any> {
    return this.http.post(`${env.API_URL}/api/v1/reservation`, data);
  }

  cancelReservation(reservationId: any): Observable<any> {
    return this.http.put(`${env.API_URL}/api/v1/reservation/cancel/${reservationId}`,{});
  }

  approve(id: string): Observable<any> {
    return this.http.put(`${env.API_URL}/api/v1/reservation/approve/${id}`, {});
  }

  deny(id: string): Observable<any> {
    return this.http.put(`${env.API_URL}/api/v1/reservation/deny/${id}`, {});
  }

}
