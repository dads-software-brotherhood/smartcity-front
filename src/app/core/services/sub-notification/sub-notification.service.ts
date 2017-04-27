import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';

import { SubNotification } from '../../models/sub-notification';

const baseRestPath = '/subnotifications';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;

@Injectable()
export class SubNotificationService {

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

  public getByNotificationId(notificationId: number): Observable<Array<SubNotification>> {
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    urlSearchParams.set('notificationId', notificationId + '');

    return this.remoteConnectionService.getAsObservable(baseGetUserUrl, null, null, urlSearchParams)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

}
