import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AccommodationApiService {
  headers = new HttpHeaders();
            
  constructor(public http: HttpClient) {
    this.headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer your_token_here');
   }

  getAccommodations(): Observable<any> {
    return this.http.get('http://localhost:8080/api/v1/accommodation');
  }

  getAccommodation(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/v1/accommodation/id?id=${id}`);
  }

  searchAccommodations(searchParams: any): Observable<any>{
    const location = searchParams.location;
    const startDate = searchParams.startDate;
    const endDate = searchParams.endDate;
    const numberOfGuests = searchParams.numberOfGuests
    return this.http.get(`http://localhost:8080/api/v1/accommodation/search?location=${location}&number-of-guests=${numberOfGuests}&start-date=${startDate}&end-date=${endDate}`)
  }
}
