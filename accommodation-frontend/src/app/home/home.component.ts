import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment as env } from '../environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchQuery: string = '';

  constructor(private router: Router) { }


  authorize() {
    let state = this.generateState(env.STATE_LENGTH)
    localStorage.setItem("old-state", state)
    
    window.location.href = `${env.API_URL}/oauth2/authorize?response_type=code&state=${state}&client_id=${env.CLIENT_ID}&scope=openid%20profile&redirect_uri=${env.REDIRECT_URL}`;
  }

  
  generateState(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const characterArray = new Uint8Array(length);
    const randomValues = crypto.getRandomValues(characterArray);
    let randomString = '';
    for (let i = 0; i < randomValues.length; i++) {
      randomString += characters.charAt(randomValues[i] % characters.length);
    }
    return randomString;
  }

  clearSearch() {
    this.searchQuery = '';
  }

  searchClicked() {
    console.log(this.searchQuery);
  }
}
