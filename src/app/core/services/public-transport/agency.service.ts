import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

import { Agency } from '../../models/agency';

const baseRestPath = '/agency';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;

@Injectable()
export class AgencyService {

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

  public getAll(): Observable<Array<Agency>> {
    return this.remoteConnectionService.getAsObservable(baseGetUserUrl)
      .map(response => response.json());
  }

}
