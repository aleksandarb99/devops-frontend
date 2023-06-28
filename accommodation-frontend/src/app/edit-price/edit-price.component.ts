import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccommodationService } from '../services/accommodation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from '../services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.css']
})
export class EditPriceComponent {
  price: number | undefined;

  @Input() id: string | undefined;
  @Input() type: string | undefined;

  @Output() successEvent = new EventEmitter<string>();
  @Output() hideEvent = new EventEmitter<string>();


  constructor( 
    public accommodationService: AccommodationService,
    public snackBar: MatSnackBar,
    private errorHandler: ErrorHandlerService,
    ){}

  submit() {
    if (this.id === undefined || this.price == undefined) {
      return;
    }

    if (this.type === "Edit price") {
      this.accommodationService.editDefaultPrice(this.id, this.price as number).subscribe(res => {
        this.success();
      }, err => this.errorHandler.errorHandle(err)); 
    } else {
      this.accommodationService.editCustomPrice(this.id, this.price as number).subscribe(res => {
        this.success();
      }, err => this.errorHandler.errorHandle(err)); 
    }
  }

  hide() {
    this.hideEvent.emit();
  }

  success() {
    this.snackBar.open("Success", '', {
      duration: 4000,
      verticalPosition: 'top'
      });
    this.successEvent.emit();
  }

}
