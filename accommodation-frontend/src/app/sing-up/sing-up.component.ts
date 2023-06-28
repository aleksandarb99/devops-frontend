import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../services/error-handler.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})

export class SingUpComponent implements OnInit {
  signUpForm: FormGroup;
  selectedOption: string | undefined;

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public userService: UserService,
    private router: Router,
    private errorHandler: ErrorHandlerService
  ) {
    this.signUpForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: ['']
    });
  }

  ngOnInit() {
  }

  signUpData() {
    let item = {
      username: this.signUpForm?.controls['userName'].value,
      password: this.signUpForm?.controls['password'].value,
      repeatPassword: this.signUpForm?.controls['repeatPassword'].value,
      email: this.signUpForm?.controls['email'].value,
      givenName: this.signUpForm?.controls['firstName'].value,
      address: this.signUpForm?.controls['address'].value,
      phoneNumber: this.signUpForm?.controls['phoneNumber'].value,
      lastName: this.signUpForm?.controls['lastName'].value,
      role: this.signUpForm?.controls['role'].value
    }

    console.log(item);

    this.userService.signup(item).subscribe(() => {
      this.registerSuccess();
    }, err => this.errorHandler.errorHandle(err));

  }

  registerSuccess() {
    this.snackBar.open("Greate", 'Greate', {
      duration: 4000,
      verticalPosition: 'top'
      });
    this.router.navigate(['']);
  }
}
