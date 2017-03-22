import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';

import { RemoteConnectionService } from '../remote-connection/remote-connection.service';
import { LoginService } from '../login/login.service';

import { RemoteUtils } from '../../common/rempote-utils';
import { UserProfile } from '../../models/user-profile';

import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const base_rest_path = '/user-profile';
const getUser = environment.backend_sdk + base_rest_path;

@Injectable()
export class UserProfileService extends RemoteUtils {

  constructor(private remoteConnectionService: RemoteConnectionService, private loginService: LoginService) {
    super(loginService);
  }

  public getUser(): Promise<UserProfile> {
    // if (this.loginService.isLoggedIn()) {
    //
    // }
    //
    // const params: URLSearchParams = new URLSearchParams();
    // params.set("", "")
    //
    // this.getAsPromise(getUser, null, null, null);


    return null;
  }
  //
  // getUserProfile(token: string, email?: string): Promise<UserProfile> {
  //   const requestOptions: RequestOptions = this.buildRequestOptions(token, email);
  //
  //   return this.http.get(user_profile, requestOptions).toPromise()
  //     .then((res: Response) => {
  //       return res.json();
  //     })
  //     .catch((error: Response | any) => {
  //       return null;
  //     });
  // }
  //
  // private buildRequestOptions(token: string, email?: string):RequestOptions {
  //   const headers: Headers = new Headers();
  //   headers.append(constants.authTokenKey, token);
  //
  //   const requestOptions: RequestOptions = new RequestOptions();
  //   requestOptions.headers= headers;
  //
  //   if (email) {
  //     const params: URLSearchParams = new URLSearchParams();
  //     params.set('email', email);
  //     requestOptions.search= params;
  //   }
  //
  //   return requestOptions;
  // }

}
