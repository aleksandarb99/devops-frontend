import { Component, OnInit } from '@angular/core';
import { JwtDecoderService } from '../services/jwt-decoder.service';
import { environment as env } from '../environment/environment';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( 
    public authService: AuthService
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

}
