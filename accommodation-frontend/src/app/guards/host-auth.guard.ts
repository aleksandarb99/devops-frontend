import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
  })
  export class HostAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}
  
    canActivate(): boolean {
      if (this.authService.loggedIn && !this.authService.isGuest) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
  }