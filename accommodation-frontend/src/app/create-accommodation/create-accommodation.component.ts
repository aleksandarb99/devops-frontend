import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { AccommodationApiService } from '../api/accommodation-api.service';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent {
  accommodationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public accommodationService: AccommodationApiService,
  ) {
    this.accommodationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      minQuests: ['', [Validators.min(1)]],
      maxQuests: ['', [Validators.min(1)]],
      defaultPrice: ['', [Validators.min(1)]],
      priceType: ['FIXED_PER_NIGHT', [Validators.required]],
      automaticApprove: [false],
      photographs: [''],
    });
  }

  ngOnInit() {
    // this.userService.getUser().pipe(
    //   catchError(err => this.errorHandle(err))
    // ).subscribe(user => {

    //   this.accommodationForm = this.formBuilder.group({
    //     userName: [user.username, [Validators.required]],
    //     email: [user.email, [Validators.required]],
    //     password: ['', [Validators.required]],
    //     address: [user.address, [Validators.required]],
    //     phoneNumber: [user.phoneNumber],
    //     firstName: [user.givenName, [Validators.required]],
    //     lastName: [user.lastName, [Validators.required]],
    //     role: [user.role]
    //   });
    // });
  }

  createAccommodation() {
    let accommodation = {
      name: this.accommodationForm?.controls['name'].value,
      location: this.accommodationForm?.controls['location'].value,
      minQuests: Number(this.accommodationForm?.controls['minQuests'].value),
      maxQuests: Number(this.accommodationForm?.controls['maxQuests'].value),
      defaultPrice: Number(this.accommodationForm?.controls['defaultPrice'].value),
      priceType: "FIXED_PER_NIGHT",
      automaticApprove: true,
      photographs: []
    }

    this.accommodationService.createAccommodation(accommodation).pipe(
      catchError(err => this.errorHandle(err))
    ).subscribe(res => {
      console.log(res);
    });

  }

  registerSuccess(data: any) {
    if (data.code === 200) {
      this.snackBar.open(data.message, 'Greate!', { duration: 3000 });
    }
  }

  async errorHandle(error: any) {
    console.log(error.error.message)
    this.snackBar.open(error.error.message, 'Dismiss', { duration: 3000 });
  }
}
