import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private snackBar: MatSnackBar, private authService: AuthService) { }

  async errorHandle(error: any) {
    if(error.status === 0) {
      this.authService.authorize();
    }
        
    let message = error.message ? error.message: error.error.message;
    this.snackBar.open(message, 'Dismiss', { duration: 3000 });
  }
}
