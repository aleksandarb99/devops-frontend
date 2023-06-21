import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserApiServiceComponent } from '../api/user-api.component';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})

export class SingUpComponent implements OnInit {
  signUpForm: FormGroup;
  selectedOption: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public userService: UserApiServiceComponent,
    private router: Router
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

    this.userService.signup(item).pipe(
      catchError(err => this.errorHandle(err))
    ).subscribe(res => {
      this.registerSuccess();
    });

  }

  registerSuccess() {
    this.snackBar.open("Greate", 'Greate', { duration: 3000 });
    this.router.navigate(['']);
  }

  async errorHandle(error: any) {
    console.log(error.error.message)
    this.snackBar.open(error.error.message, 'Dismiss', { duration: 3000 });
  }
}
