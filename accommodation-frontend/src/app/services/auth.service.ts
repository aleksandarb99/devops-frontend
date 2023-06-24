import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) {
   }

  //  TODO: Trenutno se vraca 302 na login kad se salje umesto 401; Vidi sta cemo s tim
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

    return this.http.post(`${env.USERS_URL}/oauth2/token`, formData.toString(), httpOptions)
   }
}
