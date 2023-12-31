import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../services/auth.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})

export class EditProfileComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private errorHandler: ErrorHandlerService,
    private authService:AuthService,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public userService: UserService,
    private router: Router
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


    this.userService.getUser().subscribe(user => {

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
    }, err => this.errorHandler.errorHandle(err));
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

    this.userService.updateUser(user).subscribe(res => {
       this.router.navigate(['']);
    }, err => this.errorHandler.errorHandle(err));

  }

  deleteUser(){
    this.userService.deleteUser().subscribe(()=>{
      this.authService.logOut();
    }, err => this.errorHandler.errorHandle(err));
  }

  async errorHandle(error: any) {
    console.log(error.error.message)
    this.snackBar.open(error.error.message, 'Dismiss', {
      duration: 4000,
      verticalPosition: 'top'
      });
  }
}