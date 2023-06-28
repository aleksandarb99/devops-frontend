import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccommodationService } from '../services/accommodation.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-custom-price',
  templateUrl: './custom-price.component.html',
  styleUrls: ['./custom-price.component.css']
})
export class CustomPriceComponent implements OnInit {

  displayedColumns: string[] = ['id', 'price', 'startDate', 'endDate', 'actions'];

  customPrices : any[] = []
  accommodationId: string | undefined | null

  selectedId: string | undefined;
  displayed: string | undefined;
  dateFrom: string = '';
  dateTo: string = '';
  price: number = 0;

  constructor(private errorHandler: ErrorHandlerService,private accommodationService: AccommodationService, private route: ActivatedRoute,
    public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.accommodationId = this.route.snapshot.paramMap.get('id')
    this.fetchCustomPrices()
  }

  fetchCustomPrices() {
    if (this.accommodationId === undefined || this.accommodationId === null) {
      throw new Error("Error while fetching custom prices")
    }
    this.accommodationService.getAccommodationCustomPrices(this.accommodationId)
    .subscribe((res: any)=> {
      if (res.size !== 0) {
        res = res.sort((a:any, b:any) => a.id > b.id ? 1 : -1)
      }
      this.customPrices = res;
    },
     err => this.errorHandler.errorHandle(err))
  }
  
  display(id: any, type: string) {
    this.displayed = type;
    this.selectedId = id;
  }

  handleHideEvent() {
    this.displayed = undefined;
  }

  handleEvent() {
    this.displayed = undefined;
    this.fetchCustomPrices();
  }

  delete(id: string) {
    if (this.accommodationId === undefined || this.accommodationId === null) {
      throw new Error("Error while deleting custom price")
    }
    this.accommodationService.deleteCustomPrice(this.accommodationId, id)
    .subscribe((res: any)=> {
      this.fetchCustomPrices();
    },
     err => this.errorHandler.errorHandle(err))
  }

  submitPrice() {
    if (this.accommodationId === undefined || this.accommodationId === null) {
      throw new Error("Error submiting the price. Not valid accommodation id.")
    }
    let accommodationId = Number(this.accommodationId);
    let priceData = {
      startDate: this.dateFrom,
      endDate: this.dateTo,
      price: this.price
    }

    this.accommodationService.createPrice(accommodationId, priceData).subscribe(res => {
      this.displayed = undefined;
      this.dateFrom = '';
      this.dateTo = '';
      this.price = 0;
      this.fetchCustomPrices();
    }, err => this.errorHandler.errorHandle(err)); 
  }
}
