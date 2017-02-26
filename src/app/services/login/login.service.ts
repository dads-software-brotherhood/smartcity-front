import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export const tokenName : string = 'x-subject-token';
const tokenInfoName : string = 'token-info';

@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }

  login(email: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let query = {
      "auth": {
        "identity": {
          "methods": ["password"],
          "password": {
            "user": {
              "name": email,
              "domain": { "id": "default" },
              "password": password
            }
          }
        }
      }
    };


    return this.http
      .post(
        'http://192.168.56.11:5000/v3/auth/tokens',
        JSON.stringify(query),
        { headers }
      )
      .map((res: Response) => {
        let responseHeaders = res.headers;
        let body = res.json();
        let token = responseHeaders.get(tokenName);

        if (token) {
          localStorage.setItem(tokenName, token);
          localStorage.setItem(tokenInfoName, JSON.stringify(body));
        } else {
          this.logout();
        }

        return body;
      })
      .catch((error: Response | any) => {
        this.logout();
        return error;
    });
  }

  logout() {
    localStorage.removeItem(tokenName);
    localStorage.removeItem(tokenInfoName);
  }

  isLoggedIn() {
    let toeknInfo = JSON.parse(localStorage.getItem(tokenInfoName));

    console.log(toeknInfo);

    //TODO: Revisar el token

    return !!localStorage.getItem(tokenName);
  }
}
