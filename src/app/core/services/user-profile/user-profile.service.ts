import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';

import { UserProfile } from '../../models/user-profile';

const baseRestPath = '/user-profile';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;

@Injectable()
export class UserProfileService {

  private getUserUrl: string;

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) {
    this.getUserUrl = baseGetUserUrl + '/' + loginService.getLoggedUser().id;
  }

  public getUserProfile(): Observable<UserProfile> {
    return this.remoteConnectionService.getAsObservable(this.getUserUrl)
      .map((res : Response) => res = res.json());
  }

  public updateUserProfile(): Observable<boolean> {
    return null;
    // return this.remoteConnectionService.putAsObservable(this.getUserUrl);
  }

}
