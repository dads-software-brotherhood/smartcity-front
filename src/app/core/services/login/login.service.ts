import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { IdentityUser, TokenInfo } from '../../models/identity-user';
import { UserProfile } from '../../models/user-profile'

const base_rest_path = '/security';
const login_url = environment.backend_sdk + base_rest_path + '/login';
const logout_url = environment.backend_sdk + base_rest_path + '/logout';
const valid_token_url = environment.backend_sdk + base_rest_path + '/valid-token';
const refresh_token_url = environment.backend_sdk + base_rest_path + '/refresh-token';

const user_profile = environment.backend_sdk + '/user-profile';


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


    return this.http
    .post(
      login_url,
      JSON.stringify(query),
      { headers }
    )
    .map((res: Response) => {
      const identityUser: IdentityUser = res.json();

      if (identityUser) {
        localStorage.setItem(constants.tokenInfoName, JSON.stringify(identityUser));
        return identityUser;
      } else {
        //Never happend
        this.logout();
        return null;
      }
    })
    .catch((error: Response | any) => {
      this.logout();
      return null;
    });
  }

  logout() {
    //TODO: perform logout
    this.deleteToken();
  }

  private deleteToken() {
    localStorage.removeItem(constants.tokenInfoName);
  }

  isLoggedIn(): boolean {
    //return this.isValidToken();
    return !!localStorage.getItem(constants.tokenInfoName);
  }

  private renewToken() {
  }

  private isValidToken(): Promise<boolean> {
    if (localStorage.getItem(constants.tokenInfoName)) {
      //TODO: build headers
      return this.http.post(valid_token_url, null, null).toPromise()
      .then((res: Response) => {
        return true;
      })
      .catch((error: Response | any) => {
        this.deleteToken();
        return false;
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(false);
      });
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

  getUserProfile(token: string, email?: string): Promise<UserProfile> {
    const requestOptions: RequestOptions = this.buildRequestOptions(token, email);

    return this.http.get(user_profile, requestOptions).toPromise()
      .then((res: Response) => {
        return res.json();
      })
      .catch((error: Response | any) => {
        return null;
      });
  }

  private buildRequestOptions(token: string, email?: string):RequestOptions {
    const headers: Headers = new Headers();
    headers.append(constants.authTokenKey, token);

    const requestOptions: RequestOptions = new RequestOptions();
    requestOptions.headers= headers;

    if (email) {
      const params: URLSearchParams = new URLSearchParams();
      params.set('email', email);
      requestOptions.search= params;
    }

    return requestOptions;
  }

}
