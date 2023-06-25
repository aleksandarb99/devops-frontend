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
  @Output() successEvent = new EventEmitter<string>();

  constructor( 
    public accommodationService: AccommodationService,
    public snackBar: MatSnackBar,
    private errorHandler: ErrorHandlerService,
    private router: Router
    ){}

  submit() {
    if (this.id === undefined || this.price == undefined) {
      return;
    }

    this.accommodationService.editDefaultPrice(this.id, this.price as number).subscribe(res => {
      this.success();
    }, err => this.errorHandler.errorHandle(err)); 
  }

  success() {
    this.snackBar.open("Success", '', { duration: 3000 });
    this.successEvent.emit();
  }

}
