import { Component, OnInit } from '@angular/core';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { environment as env } from '../environment/environment';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( 
    public authService: AuthService,
    public jwtDecoder: JwtDecoderService,
    public router: Router
    ) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn();
  }

  async authorize() {
    await this.authService.authorize();
  }

  logOut() {
    this.authService.logOut();
  }

  bookedAccommodationOverview(){
    const id = this.jwtDecoder.getIdFromToken();
    this.router.navigate(['/booked-accommodation-overview',id]); 
  }

}
