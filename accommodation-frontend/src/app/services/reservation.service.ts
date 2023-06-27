import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  fetchUncheckedReservations() {
    return this.http.get(`${env.API_URL}/api/v1/reservation/by-user-and-status?status=REQUESTED`);
  }

  createReservation(data: any): Observable<any> {
    return this.http.post(`${env.API_URL}/api/v1/reservation`, data);
  }

  approve(id: string): Observable<any> {
    return this.http.put(`${env.API_URL}/api/v1/reservation/approve/${id}`, {});
  }

  deny(id: string): Observable<any> {
    return this.http.put(`${env.API_URL}/api/v1/reservation/deny/${id}`, {});
  }

}
