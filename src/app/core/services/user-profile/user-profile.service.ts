import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

import { UserProfile } from '../../models/user-profile';

const baseRestPath = '/user-profile';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;

@Injectable()
export class UserProfileService {

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

  public getUserProfile(): Observable<UserProfile> {
    return this.remoteConnectionService.getAsObservable(this.buildUrl())
      .map((res : Response) => res = res.json());
  }

  public updateUserProfile(userProfile: UserProfile): Observable<any> {
    return this.remoteConnectionService.putAsObservable(this.buildUrl(), JSON.stringify(userProfile), constants.contentTypeJson);
  }

  private buildUrl(): string {
    return baseGetUserUrl + '/' + this.loginService.getLoggedUser().id;
  }

}
