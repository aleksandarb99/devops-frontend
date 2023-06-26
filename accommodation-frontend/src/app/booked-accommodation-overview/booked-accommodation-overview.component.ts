import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { ReservationService } from '../services/reservation.service';
import { AccommodationService } from '../services/accommodation.service';
import { switchMap, catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-booked-accommodation-overview',
  templateUrl: './booked-accommodation-overview.component.html',
  styleUrls: ['./booked-accommodation-overview.component.css']
})
export class BookedAccommodationOverviewComponent{
  bookedAccommodations: any[] = [];
  bookedAccomodationsData: any[] = []
  accommodations: any[] = [];

  constructor(
    public reservationService: ReservationService,
    public accommodationService: AccommodationService,
    public snackBar: MatSnackBar,
    public jwtDecoder: JwtDecoderService,
    private errorHandler: ErrorHandlerService
  ){

    this.accommodationService.getAccommodations().pipe(
      catchError(err => this.errorHandler.errorHandle(err)),
      switchMap(accommodations => {
        this.accommodations = accommodations;
        return this.reservationService.getBookedAccommodation().pipe(
          catchError(err => this.errorHandler.errorHandle(err))
        );
      })
    ).subscribe(res => {
      this.bookedAccomodationsData = res;
      this.bookedAccommodations = this.bookedAccomodationsData.map(bookedAccommodation => {
      let accommodationName = this.accommodations.find(accommodation => accommodation.id === bookedAccommodation.accommodationId);

      return bookedAccommodation = {
          id: bookedAccommodation.id,
          startDate: bookedAccommodation.startDate,
          endDate: bookedAccommodation.endDate,
          numberOfGuests: bookedAccommodation.numberOfGuests,
          totalPrice: bookedAccommodation.totalPrice,
          name: accommodationName.name
        };
      });
    });
  }

  cancelReservation(id: number): void {
    this.reservationService.cancelReservation(id).subscribe(res => {
      this.cancelSuccess();
    }, err => this.errorHandler.errorHandle(err));
  }

  cancelSuccess() {
    this.snackBar.open("Your reservation is cancled", '', { duration: 3000 });
  }


}