import { Component } from '@angular/core';
import { ReservationApiService } from '../api/reservation-api.service';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccommodationApiService } from '../api/accommodation-api.service';
import { JwtDecoderService } from '../services/jwt-decoder.service';

@Component({
  selector: 'app-booked-accommodation-overview',
  templateUrl: './booked-accommodation-overview.component.html',
  styleUrls: ['./booked-accommodation-overview.component.css']
})
export class BookedAccommodationOverviewComponent {
  bookedAccommodations: any[] = [];
  accommodations: any[] = [];

  constructor(
    public reservationService: ReservationApiService,
    public accommodationService: AccommodationApiService,
    public snackBar: MatSnackBar,
    public jwtDecoder: JwtDecoderService
  ){

    this.accommodationService.getAccommodations().pipe(
      catchError(err => this.errorHandle(err))
    ).subscribe(res => {
       this.accommodations = res;
    }); 

    this.reservationService.getBookedAccommodation().pipe(
      catchError(err => this.errorHandle(err))
    ).subscribe(res => {
      this.bookedAccommodations.map(bookedAccommodation =>{
        let accommodationName = this.accommodations.filter(a => {
          a.id == res.accommodationId
          return a.name
        });
        bookedAccommodation = {
          startDate: res.startDate,
          endDate: res.endDate,
          numberOfGuests: res.numberOfGuests,
          totalPrice: res.totalPrice,
          accommondationName: accommodationName
        }
      })
    }); 
  }

  onButtonClick(): void {
    console.log('Button clicked!');
  }

  async errorHandle(error: any) {
    console.log(error.error.message)
    this.snackBar.open(error.error.message, 'Dismiss', { duration: 3000 });
  }
}
