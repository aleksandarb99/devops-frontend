import { Component } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { ErrorHandlerService } from '../services/error-handler.service';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent {
  displayedColumns: string[] = ['id', 'accommodationId', 'startDate', 'endDate', 'numberOfGuests', 'totalPrice', 'actions'];

  reservations : any[] = []

  constructor(private errorHandler: ErrorHandlerService,private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchUncheckedReservations()
  }

  fetchUncheckedReservations() {
    this.reservationService.fetchUncheckedReservations()
    .subscribe((res: any)=> {
      console.log(res);
    
      if (res.size !== 0) {
        res = res.sort((a:any, b:any) => a.id > b.id ? 1 : -1)
      }
      this.reservations = res;
    },
     err => this.errorHandler.errorHandle(err))
  } 

  deny(id: string) {
    this.reservationService.deny(id)
    .subscribe((res: any)=> {
      this.fetchUncheckedReservations()
    },
     err => this.errorHandler.errorHandle(err))
  }

  approve(id: any) {
    this.reservationService.approve(id)
    .subscribe((res: any)=> {
      this.fetchUncheckedReservations()
    },
     err => this.errorHandler.errorHandle(err))
  }
  
}
