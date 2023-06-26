import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../environment/environment';
import { JwtDecoderService } from './jwt-decoder.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn: boolean | undefined
  public isGuest: boolean = false;

  constructor(public http: HttpClient, private jwtDecoder: JwtDecoderService) {
    this.isUserLoggedIn();
   }

  async authorize() {
    let codeVerifier = this.generateCodeVerifier(env.STATE_LENGTH);
    localStorage.setItem("code_verifier", codeVerifier)

    let code_challange = await this.challenge_from_verifier(codeVerifier)
    
    window.location.href = `${env.API_URL}/oauth2/authorize?code_challenge_method=S256&response_type=code&code_challenge=${code_challange}&client_id=${env.CLIENT_ID}&scope=openid%20profile&redirect_uri=${encodeURIComponent(env.REDIRECT_URL)}`;
  }

  logOut() {
    localStorage.clear();
    this.isUserLoggedIn();
    window.location.href = `${env.API_URL}/logout`;
  }

  isUserLoggedIn() {    
    let accessToken = localStorage.getItem("access_token");
    if (accessToken === undefined || accessToken === "" || accessToken === null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
      this.isGuest = this.jwtDecoder.getRoleFromToken() === "GUEST";
    }    
  }

  sendPostToTokenEndpoint(code: string, code_verifier: string) {
    const formData = new URLSearchParams();
    formData.set('grant_type', 'authorization_code');
    formData.set('code', code);
    formData.set('client_id', env.CLIENT_ID);
    formData.set('redirect_uri', env.REDIRECT_URL);
    formData.set('code_verifier', code_verifier);

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'}),
    };

    return this.http.post(`${env.API_URL}/oauth2/token`, formData.toString(), httpOptions)
   }

  private generateCodeVerifier(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    let codeVerifier = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      codeVerifier += characters.charAt(randomIndex);
    }
  
    return codeVerifier;
  }
  
  private async challenge_from_verifier(v: string) {
    let hashed = await this.sha256(v);
    return this.base64urlencode(hashed);
  }
 
  private sha256(plain: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  }

  private base64urlencode(a: any) {
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

}
