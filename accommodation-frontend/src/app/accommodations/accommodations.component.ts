import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../services/accommodation.service';
import { ErrorHandlerService } from '../services/error-handler.service';


@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrls: ['./accommodations.component.css']
})
export class AccommodationsComponent implements OnInit {
  // accommodations:any[] = [];
  accommodations = []

  //  'automaticApprove', 'kitchen',
  // 'wifi', 'ac', 'freeParkingSpace'
  displayedColumns: string[] = ['id', 'name', 'location', 'minQuests',
   'maxQuests', 'priceType', 'defaultPrice', 'actions'];

  selectedId: string | undefined;
  displayed: string | undefined;

  constructor(private accommodationService: AccommodationService, private errorHandler: ErrorHandlerService) {}

  ngOnInit(): void {
    this.fetchAccommodations();
  }

  display(id: any, type: string) {
    this.displayed = type;
    this.selectedId = id;
  }

  handleEvent() {
    this.displayed = undefined;
    this.fetchAccommodations();
  }

  fetchAccommodations() {
    this.accommodationService.getMyAccommodations()
      .subscribe((res)=> {
        console.log(res);
      
        if (res.size !== 0) {
          res = res.sort((a:any, b:any) => a.id > b.id ? 1 : -1)
        }
        this.accommodations = res;
      },
       err => this.errorHandler.errorHandle(err))
  }
}
