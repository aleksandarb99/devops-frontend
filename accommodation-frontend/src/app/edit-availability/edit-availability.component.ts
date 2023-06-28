import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccommodationService } from '../services/accommodation.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from '../services/error-handler.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-availability',
  templateUrl: './edit-availability.component.html',
  styleUrls: ['./edit-availability.component.css']
})
export class EditAvailabilityComponent {
  newDate: string = '';

  labelPosition: 'END_DATE' | 'START_DATE' = 'START_DATE';

  checked = false;
  indeterminate = false;
  disabled = false;

  @Input() id: string | undefined;
  accId : string | undefined

  @Output() successEvent = new EventEmitter<string>();
  @Output() hideEvent = new EventEmitter<string>();


  constructor( 
    public accommodationService: AccommodationService,
    public snackBar: MatSnackBar,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
    ){
      this.route.params.subscribe(params => {
        this.accId = params['id'];
      });
    }

  submit() {
    if (this.id === undefined || this.newDate === '') {
      return;
    }

    this.accommodationService.editAvailability(this.accId as string, this.id, this.newDate, this.labelPosition).subscribe(res => {
      this.success();
    }, err => this.errorHandler.errorHandle(err)); 
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

