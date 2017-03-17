import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { IdentityUser, TokenInfo } from '../../models/identity-user';

const tokenInfoName = 'token-info';

const base_rest_path = '/security';
const login_url = environment.backend_sdk + base_rest_path + '/login';
const logout_url = environment.backend_sdk + base_rest_path + '/logout';
const valid_token_url = environment.backend_sdk + base_rest_path + '/valid-token';
const refresh_token_url = environment.backend_sdk + base_rest_path + '/refresh-token';


@Injectable()
export class LoginService {

  constructor(private http: Http) {}

  login(email: string, password: string) {
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
        identityUser.name = identityUser.username;

        localStorage.setItem(tokenInfoName, JSON.stringify(identityUser));
      } else {
        this.logout();
      }

      return identityUser;
    })
    .catch((error: Response | any) => {
      console.log('Error at login');
      console.log(error);

      this.logout();
      return [{'code': '503'}];
    });
  }

  logout() {
    //TODO: perform logout
    this.deleteToken();
  }

  private deleteToken() {
    localStorage.removeItem(tokenInfoName);
  }

  isLoggedIn(): boolean {
    //return this.isValidToken();
    return !!localStorage.getItem(tokenInfoName);
  }

  private renewToken() {
  }

  private isValidToken(): Promise<boolean> {
    if (localStorage.getItem(tokenInfoName)) {
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
    const tmp: string = localStorage.getItem(tokenInfoName);

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

}
