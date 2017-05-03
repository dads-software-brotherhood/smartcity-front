import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

import { Address } from '../../models/address';
import { ChangePassword } from '../../models/change-password';
import { UserProfile } from '../../models/user-profile';

const baseRestPath = '/user-profile';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;
const changePasswordPath = environment.backend_sdk + '/register/update-password';

@Injectable()
export class UserProfileService {

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

  public getUserProfile(): Observable<UserProfile> {
    return this.remoteConnectionService.getAsObservable(this.buildProfileUrl())
      .map((res: Response) => res = res.json());
  }

  public updateUserProfile(userProfile: UserProfile): Observable<any> {
    return this.remoteConnectionService.putAsObservable(this.buildProfileUrl(), JSON.stringify(userProfile), constants.contentTypeJson);
  }

  public getAddress(index: string): Observable<Address> {
    return this.remoteConnectionService.getAsObservable(this.buildAddressUrl(index))
      .map((res: Response) => res = res.json());
  }

  public insertAddress(address: Address) {
    return this.remoteConnectionService.postAsObservable(this.buildAddressUrl(), JSON.stringify(address), constants.contentTypeJson)
      .map((res: Response) => res = res.json());
  }

  public updateAddress(address: Address) {
    return this.remoteConnectionService.putAsObservable(this.buildAddressUrl(address.index),
      JSON.stringify(address), constants.contentTypeJson)
        .map((res: Response) => res = res.json());
  }

  public deleteAddress(index: string) {
    return this.remoteConnectionService.deleteAsObservable(this.buildAddressUrl(index));
  }

  public changePassword(changePassword: ChangePassword): Observable<any> {
    return this.remoteConnectionService.postAsObservable(changePasswordPath, JSON.stringify(changePassword), constants.contentTypeJson);
  }

  public cancelAccount(): Observable<any> {
    const url: string = this.buildProfileUrl();
    return this.remoteConnectionService.deleteAsObservable(url);
  }

  private buildProfileUrl(): string {
    return baseGetUserUrl + '/' + this.loginService.getLoggedUser().id;
  }

  private buildAddressUrl(index?: string): string {
    let tmp = this.buildProfileUrl() + '/address';

    if (index) {
      tmp += '/' + index;
    }

    return tmp;
  }

}
