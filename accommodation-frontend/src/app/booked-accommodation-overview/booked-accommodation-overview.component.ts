import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { ReservationService } from '../services/reservation.service';
import { AccommodationService } from '../services/accommodation.service';

@Component({
  selector: 'app-booked-accommodation-overview',
  templateUrl: './booked-accommodation-overview.component.html',
  styleUrls: ['./booked-accommodation-overview.component.css']
})
export class BookedAccommodationOverviewComponent {
  bookedAccommodations: any[] = [];
  accommodations: any[] = [];

  constructor(
    public reservationService: ReservationService,
    public accommodationService: AccommodationService,
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
        let accommodationName = this.accommodations.filter(accommodation => {
          accommodation.id == res.accommodationId
          return accommodation.name
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

  cancelReservation(): void {
    //TO DO
    console.log('Reservation canceled!');
  }

  async errorHandle(error: any) {
    this.snackBar.open(error.error.message, 'Dismiss', { duration: 3000 });
  }
}