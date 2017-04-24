import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Alert } from '../../models/alert';
import { LoginService } from '../login/login.service';

import { environment } from '../../../../environments/environment';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';
import { constants } from '../../common/constants';

const baseGetAlertUrl = environment.backend_sdk;

@Injectable()
export class AlertService {

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

   getAll(): Observable<Array<Alert>> {
    return this.remoteConnectionService.getAsObservable(this.buildAlertUrl(), null, null, null)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  private buildAlertUrl() {
    return baseGetAlertUrl + '/alerts/';
  }
}