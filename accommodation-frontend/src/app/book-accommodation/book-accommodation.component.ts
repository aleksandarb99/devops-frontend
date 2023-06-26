import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReservationService } from '../services/reservation.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { Router } from '@angular/router';

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
  @Input() userId: number | undefined;

  constructor( 
    public reservationService: ReservationService,
    public snackBar: MatSnackBar,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ){}

  submitReservation() {
    let data = {
      accommodationId: this.id,
      startDate: this.dateFrom,
      endDate: this.dateTo,
      numberOfGuests: this.numberOfGuests,
      user:this.userId
    }

    this.reservationService.createReservation(data).subscribe(res => {
      this.successfullyBooked();
    }, err => this.errorHandler.errorHandle(err)); 
  }

  successfullyBooked() {
    this.snackBar.open("You booked apartment", '', { duration: 3000 });
    this.router.navigate([""])
  }

}
