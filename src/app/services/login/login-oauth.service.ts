import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export const tokenName = 'x-subject-token';
const tokenInfoName = 'token-info';

@Injectable()
export class LoginOauthService {

  constructor(private http: Http) {
  }

  login(email: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic ' + btoa(environment.client_id + ':' + environment.client_secret));

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('grant_type', 'password');
    urlSearchParams.append('username', email);
    urlSearchParams.append('password', password);

    let body = urlSearchParams.toString();


    return this.http
    .post(
      environment.idm_server + '/oauth2/token',
      body,
      { headers }
    )
    .map((res: Response) => {
      const responseHeaders = res.headers;
      const body = res.json();
//      const token = responseHeaders.get(tokenName);

      if (body) {
        localStorage.setItem(tokenName, body.access_token);
        localStorage.setItem(tokenInfoName, JSON.stringify(body));

        console.log(body);
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
}
