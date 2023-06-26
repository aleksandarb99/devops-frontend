import { Component, Input } from '@angular/core';
import { ReservationApiService } from '../api/reservation-api.service';
import { catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtDecoderService } from '../services/jwt-decoder.service';

@Component({
  selector: 'app-book-accommodation',
  templateUrl: './book-accommodation.component.html',
  styleUrls: ['./book-accommodation.component.css']
})
export class BookAccommodationComponent {
  dateFrom: string = '';
  dateTo: string = '';
  numberOfGuests: number | undefined;

  @Input() id: number | undefined;

  constructor( 
    public reservationService: ReservationApiService,
    public snackBar: MatSnackBar,
    public jwtDecoder: JwtDecoderService
    ){}

  submitReservation() {
    let data = {
      accommodationId: this.id,
      startDate: this.dateFrom,
      endDate: this.dateTo,
      guestId: this.jwtDecoder.getIdFromToken(),
      numberOfGuests: this.numberOfGuests
    }

    this.reservationService.createReservation(data).pipe(
      catchError(err => this.errorHandle(err))
    ).subscribe(res => {
      this.successfullyBooked();
    }); 
  }

  successfullyBooked() {
    this.snackBar.open("You booked apartment", '', { duration: 3000 });
  }

  async errorHandle(error: any) {
    console.log(error.error.message)
    this.snackBar.open(error.error.message, 'Dismiss', { duration: 3000 });
  }
}
