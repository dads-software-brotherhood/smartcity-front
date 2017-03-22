import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { IdentityUser, TokenInfo } from '../../models/identity-user';

const base_rest_path = '/security';
const login_url = environment.backend_sdk + base_rest_path + '/login';
const logout_url = environment.backend_sdk + base_rest_path + '/logout';
const valid_token_url = environment.backend_sdk + base_rest_path + '/valid-token';
const refresh_token_url = environment.backend_sdk + base_rest_path + '/refresh-token';

@Injectable()
export class LoginService {

  constructor(private http: Http) {}

  login(email: string, password: string): Observable<IdentityUser> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const query = {
      'username': email,
      'password': password
    };

    return this.http.post(login_url, JSON.stringify(query), { headers })
    .map((res: Response) => {
      const identityUser: IdentityUser = res.json();

      if (identityUser) {
        localStorage.setItem(constants.tokenInfoName, JSON.stringify(identityUser));
        return identityUser;
      } else { //This case never happend
        this.deleteToken();
        return null;
      }
    })
    .catch((error: Response | any) => {
      this.deleteToken();
      return null;
    });
  }

  logout() {
    const token: string = this.getToken();

    if (token) {
      const requestOptions: RequestOptions = this.buildRequestOptions(token);

      this.http.delete(logout_url, requestOptions)
      .subscribe((res) => {
        console.log('logout')
      });

      this.deleteToken(); //We delete token from local storage
    }
  }

  private deleteToken() {
    localStorage.removeItem(constants.tokenInfoName);
  }

  isLoggedIn(): Observable<boolean> {
    const token: string = this.getToken();

    console.log(token);

    if (token) {
      const requestOptions: RequestOptions = this.buildRequestOptions(token);
      return this.http.get(valid_token_url, requestOptions)
              .map((res: Response) => {
                return true;
              });
    } else {
      return null;
    }
  }

  getLoggedUser(): IdentityUser {
    const tmp: string = localStorage.getItem(constants.tokenInfoName);

    if (tmp) {
      return JSON.parse(tmp);
    } else {
      return null;
    }
  }

  getToken(): string {
    const identityUser: IdentityUser = this.getLoggedUser();

    if (identityUser) {
      return identityUser.tokenInfo.token;
    } else {
      return null;
    }
  }

  private buildRequestOptions(token: string):RequestOptions {
    const headers: Headers = new Headers();
    headers.append(constants.authTokenKey, token);

    const requestOptions: RequestOptions = new RequestOptions();
    requestOptions.headers = headers;

    return requestOptions;
  }

}
