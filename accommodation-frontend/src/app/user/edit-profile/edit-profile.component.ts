import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserApiServiceComponent } from 'src/app/api/user-api.component';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public userService: UserApiServiceComponent,
  ) {
    this.userForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: [''],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: ['']
    });
  }

  ngOnInit() {


    this.userService.getUser().pipe(
      catchError(err => this.errorHandle(err))
    ).subscribe(user => {

      this.userForm = this.formBuilder.group({
        userName: [user.username, [Validators.required]],
        email: [user.email, [Validators.required]],
        password: ['', [Validators.required]],
        address: [user.address, [Validators.required]],
        phoneNumber: [user.phoneNumber],
        firstName: [user.givenName, [Validators.required]],
        lastName: [user.lastName, [Validators.required]],
        role: [user.role]
      });


    });
  }

  editData() {
    let user = {
      username: this.userForm?.controls['userName'].value,
      password: this.userForm?.controls['password'].value,
      email: this.userForm?.controls['email'].value,
      givenName: this.userForm?.controls['firstName'].value,
      address: this.userForm?.controls['address'].value,
      phoneNumber: this.userForm?.controls['phoneNumber'].value,
      lastName: this.userForm?.controls['lastName'].value,
      role: this.userForm?.controls['role'].value
    }

    this.userService.updateUser(user).pipe(
      catchError(err => this.errorHandle(err))
    ).subscribe(res => {
      //  this.registerSuccess(res);
    });

  }

    deleteUser(){
      //TODO
    this.userService.deleteUser().pipe(
      catchError(err => this.errorHandle(err))
    ).subscribe();
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