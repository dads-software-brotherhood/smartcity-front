import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

import { TransportSchedule } from '../../models/transport-schedule';

const baseRestPath = '/transport-schedule';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;

@Injectable()
export class TransportScheduleService {

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

  public getAll(): Observable<Array<TransportSchedule>> {
    return this.remoteConnectionService.getAsObservable(baseGetUserUrl);
  }
}
