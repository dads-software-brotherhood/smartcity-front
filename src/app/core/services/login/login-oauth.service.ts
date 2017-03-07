import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import { environment } from '../../../../environments/environment';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export const tokenName = 'x-subject-token';
const tokenInfoName = 'token-info';

import { users, UserInfo } from './users';

class TokenInfo {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  start_date?: Date;
}

@Injectable()
export class LoginOauthService {

  constructor(private http: Http) {
  }

  login(email: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(environment.client_id + ':' + environment.client_secret));

    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'password');
    urlSearchParams.append('username', email);
    urlSearchParams.append('password', password);

    const bodyReq = urlSearchParams.toString();


    return this.http
    .post(
      environment.idm_server + '/oauth2/token',
      bodyReq,
      { headers }
    )
    .map((res: Response) => {
      const responseHeaders = res.headers;
      const body = res.json();
//      const token = responseHeaders.get(tokenName);

      if (body) {
        const tokenInfo: TokenInfo = res.json();
        tokenInfo.start_date = new Date;

        localStorage.setItem(tokenName, body.access_token);
        localStorage.setItem(tokenInfoName, JSON.stringify(body));

        console.log(tokenInfo);
      } else {
        this.logout();
      }

      return body;
    })
    .catch((error: Response | any) => {
       console.log('Error at login');
       console.log(error);
      this.logout();
      return [{'code': '503'}];
    });
  }

  logout() {
    localStorage.removeItem(tokenName);
    localStorage.removeItem(tokenInfoName);

    // TODO: Eliminar el token del servidor IDM
  }

  isLoggedIn() {
    const toeknInfo = JSON.parse(localStorage.getItem(tokenInfoName));

    // if (toeknInfo) {
    //   console.log(toeknInfo);
    // }
    // TODO: Revisar el token

    return !!localStorage.getItem(tokenName);
  }

  getUserInfo(): UserInfo {
    return users[0];
  }
}
