import { Component, OnInit } from '@angular/core';
import { environment as env } from '../environment/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  loggedIn: boolean | undefined

  constructor() { 
  }

  ngOnInit(): void {
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    let idToken = localStorage.getItem("id_token");
    if (idToken === undefined || idToken === "" || idToken === null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }    
  }

  sha256(plain: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }
  
  base64urlencode(a: any) {
        var str = "";
        var bytes = new Uint8Array(a);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
          str += String.fromCharCode(bytes[i]);
        }
        return btoa(str)
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
      }
  
  async challenge_from_verifier(v: string) {
    let hashed = await this.sha256(v);
    return this.base64urlencode(hashed);
  }

  async authorize() {
    let codeVerifier = this.generateCodeVerifier(env.STATE_LENGTH);
    localStorage.setItem("code_verifier", codeVerifier)

    let code_challange = await this.challenge_from_verifier(codeVerifier)
    
    window.location.href = `${env.USERS_URL}/oauth2/authorize?code_challenge_method=S256&response_type=code&code_challenge=${code_challange}&client_id=${env.CLIENT_ID}&scope=openid%20profile&redirect_uri=${encodeURIComponent(env.REDIRECT_URL)}`;
  }

  logOut() {
    localStorage.clear();
    this.isUserLoggedIn();
  }

  generateCodeVerifier(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let codeVerifier = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      codeVerifier += characters.charAt(randomIndex);
    }
  
    return codeVerifier;
  }

  clearSearch() {
    this.searchQuery = '';
  }

  searchClicked() {
    console.log(this.searchQuery);
  }
}
