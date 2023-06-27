import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient) { }

  editAvailability(accId: string, id: string, newDate: Date, type: string) {
    return this.http.put(`${env.API_URL}/api/v1/accommodation/${accId}/availability/${id}`, {newDate, type});
  }

  deleteAvailability(accId: string, id: string) {
    return this.http.delete(`${env.API_URL}/api/v1/accommodation/${accId}/availability/${id}`);
  }

  editCustomPrice(id: string, price: number) {
    return this.http.put(`${env.API_URL}/api/v1/accommodation/custom-price/${id}`, { price });
  }

  deleteCustomPrice(accId: string, id: string) {
    return this.http.delete(`${env.API_URL}/api/v1/accommodation/${accId}/custom-price/${id}`);
  }

  getAccommodationAvailabilities(id: string) {
    return this.http.get(`${env.API_URL}/api/v1/accommodation/${id}/availabilities`);
  }

  getAccommodationCustomPrices(id: string) {
    return this.http.get(`${env.API_URL}/api/v1/accommodation/${id}/custom-price`);
  }

  getMyAccommodations(): Observable<any> {
    return this.http.get(`${env.API_URL}/api/v1/accommodation/per-host`);
  }

  editDefaultPrice(id: string, price: number) {
    return this.http.put(`${env.API_URL}/api/v1/accommodation/${id}/default-price/${price}`, null);
  }

  getAccommodations(): Observable<any> {
    return this.http.get(`${env.API_URL}/api/v1/accommodation`);
  }

  getAccommodation(id: number): Observable<any> {
    return this.http.get(`${env.API_URL}/api/v1/accommodation/`+id);
  }

  searchAccommodations(searchParams: any): Observable<any>{
    const location = searchParams.location;
    const startDate = searchParams.startDate;
    const endDate = searchParams.endDate;
    const numberOfGuests = searchParams.numberOfGuests
    return this.http.get(`${env.API_URL}/api/v1/accommodation/search?location=${location}&number-of-guests=${numberOfGuests}&start-date=${startDate}&end-date=${endDate}`)
  }

  createAccommodation(accommodationData: any) {
    return this.http.post(`${env.API_URL}/api/v1/accommodation`, accommodationData);
   }
}
