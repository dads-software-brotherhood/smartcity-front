import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export const tokenName = 'x-subject-token';
const tokenInfoName = 'token-info';

@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }

  login(email: string, password: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const query = {
      'auth': {
        'identity': {
          'methods': ['password'],
          'password': {
            'user': {
              'name': email,
              'domain': { 'id': 'default' },
              'password': password
            }
          }
        }
      }
    };


    return this.http
    .post(
      '/keyrock/v3/auth/tokens',
      JSON.stringify(query),
      { headers }
    )
    .map((res: Response) => {
      const responseHeaders = res.headers;
      const body = res.json();
      const token = responseHeaders.get(tokenName);

      if (token) {
        localStorage.setItem(tokenName, token);
        localStorage.setItem(tokenInfoName, JSON.stringify(body));
      } else {
        this.logout();
      }

      return body;
    })
    .catch((error: Response | any) => {
      // console.log('Error at login');
      // console.log(error);
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
