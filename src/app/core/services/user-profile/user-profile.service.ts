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
    super();
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


}
