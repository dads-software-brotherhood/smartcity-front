import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { role } from '../../../core/models/role';

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
    headers.append('Content-Type', constants.contentTypeJson);

    const query = {
      'username': email,
      'password': password
    };

    return this.http.post(login_url, JSON.stringify(query), { headers })
    .map((res: Response) => {
      const identityUser: IdentityUser = res.json();

      if (identityUser) {
        identityUser.date = new Date();
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

  logout(): Observable<boolean> {
    const token: string = this.getToken();

    if (token) {
      const requestOptions: RequestOptions = this.buildRequestOptions(token);
      this.deleteToken(); //We delete token from local storage

      return this.http.delete(logout_url, requestOptions)
        .map((res) => {
          console.log('logout');
          return true;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
    } else {
      return null;
    }
  }

  private deleteToken() {
    localStorage.removeItem(constants.tokenInfoName);
  }

  isLoggedIn(): boolean {
    return this.checkToken();
  }

  private checkToken(){
    const identityUser: IdentityUser = this.getLoggedUser();

    if (identityUser && identityUser.date && identityUser.tokenInfo && identityUser.tokenInfo.time) {
      const renewTime = identityUser.tokenInfo.time / 2;
      const currentDate = new Date();
      const tokenTime = (currentDate.getTime() - new Date(identityUser.date).getTime()) / 1000; //Logged time in seconds

      if (tokenTime > identityUser.tokenInfo.time) {
        return false;
      } else {
        if (tokenTime > renewTime) {
          //TODO: Refresh token
        }
        return true;
      }
    } else {
      return false;
    }
  }

  isAdmin(): boolean {
    return this.checkRole(role.ADMIN);
  }

  isSA(): boolean {
    return this.checkRole(role.SA);
  }

  isTransportAdmin(): boolean{
    return this.checkRole(role.TRANSPORT_ADMIN);
  }

  checkRole(roleToCompare: role): boolean {
     const identityUser: IdentityUser = this.getLoggedUser();
    if (this.checkToken()){
      if (identityUser.roles.indexOf(role[roleToCompare])  > -1) {
            return true;
      };
    }
    return false;
  }


  // isLoggedIn(): Observable<boolean> {
  //   const token: string = this.getToken();

  //   if (token) {
  //     const requestOptions: RequestOptions = this.buildRequestOptions(token);
  //     return this.http.get(valid_token_url, requestOptions)
  //             .map((res: Response) => {
  //               return true;
  //             });
  //   } else {
  //     return null;
  //   }
  // }

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
