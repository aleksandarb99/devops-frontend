import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {
  private _helper : JwtHelperService = new JwtHelperService();
  constructor() {}

  public getIdFromToken() : string | null {
    const token : string | null = localStorage.getItem('access_token');
    if (token) {
      return this._helper.decodeToken(token)?.id;
    }
    return null;
  }

  public getRoleFromToken() {
    const token : string | null = localStorage.getItem('access_token');
    if (token) {
      return this._helper.decodeToken(token)?.roles[0];
    }
    return null;
  }

  public isTokenExpired() : boolean{
    const token : string | null = localStorage.getItem('access_token');
    if (token) {
      return this._helper.isTokenExpired(token);
    }
    return true;
  }
}
