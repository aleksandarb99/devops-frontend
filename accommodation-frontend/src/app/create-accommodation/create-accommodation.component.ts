import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AccommodationService } from '../services/accommodation.service';

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css']
})
export class CreateAccommodationComponent {
  accommodationForm: FormGroup;
  selectedApprove: boolean = false;
  selectedPriceType: string = "FIXED_PER_NIGHT";

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public accommodationService: AccommodationService,
    private errorHandler: ErrorHandlerService
  ) {
    this.accommodationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      minQuests: ['', [Validators.min(1)]],
      maxQuests: ['', [Validators.min(1)]],
      defaultPrice: ['', [Validators.min(1)]],
      priceType: ['FIXED_PER_NIGHT', [Validators.required]],
      automaticApprove: [false],
      photographs: [],
      wifi: [false],
      ac: [false],
      kitchen: [false],
      freeParkingSpace: [false],
    });
  }

  ngOnInit() {
  }

  createAccommodation() {
    if (this.accommodationForm.invalid) {
      const error = {
        error: {
          message: "Form is in invalid state."
        }
      }
      this.errorHandle(error);
      return;
    }

    let accommodation = {
      name: this.accommodationForm?.controls['name'].value,
      location: this.accommodationForm?.controls['location'].value,
      minQuests: Number(this.accommodationForm?.controls['minQuests'].value),
      maxQuests: Number(this.accommodationForm?.controls['maxQuests'].value),
      defaultPrice: Number(this.accommodationForm?.controls['defaultPrice'].value),
      priceType: this.selectedPriceType,
      automaticApprove: this.selectedApprove,
      photographs: this.accommodationForm?.controls['photographs'].value,
      benefits: {
        wifi: this.accommodationForm?.controls['wifi'].value,
        ac: this.accommodationForm?.controls['ac'].value,
        kitchen: this.accommodationForm?.controls['kitchen'].value,
        freeParkingSpace: this.accommodationForm?.controls['freeParkingSpace'].value
      }
    }

    this.accommodationService.createAccommodation(accommodation).subscribe(res => {
      const success = {
        message: "Accommodation is successfully created!"
      }
      this.clearForm();
      this.registerSuccess(success);
    }, err => this.errorHandler.errorHandle(err));

  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files) {
      const filePromises = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        const filePromise = new Promise((resolve, reject) => {
          reader.onloadend = () => {
            const base64String = reader.result as string;
            resolve(base64String);
          };
          reader.readAsDataURL(file);
        });
        filePromises.push(filePromise);
      }
      Promise.all(filePromises).then(base64Strings => {
        this.accommodationForm.patchValue({
          photographs: base64Strings
        });
      });
    }
  }

  removeImagePreview(index: number) {
    this.accommodationForm?.controls['photographs'].value.splice(index, 1);
    console.log(this.accommodationForm?.controls['photographs'].value)
  }
  

  registerSuccess(data: any) {
    console.log(data);
    if (data.code === 200 || data.code === 201) {
      console.log(data.message);
      this.snackBar.open(data.message, 'Greate!', { duration: 3000 });
    }
  }

  async errorHandle(error: any) {
    console.log(error.error.message)
    this.snackBar.open(error.error.message, 'Dismiss', { duration: 3000 });
  }

  clearForm() {
    this.selectedApprove = false;
    this.selectedPriceType = "FIXED_PER_NIGHT";
    this.accommodationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      minQuests: ['', [Validators.min(1)]],
      maxQuests: ['', [Validators.min(1)]],
      defaultPrice: ['', [Validators.min(1)]],
      priceType: ['FIXED_PER_NIGHT', [Validators.required]],
      automaticApprove: [false],
      photographs: [],
      wifi: [false],
      ac: [false],
      kitchen: [false],
      freeParkingSpace: [false],
    });
  }
}
