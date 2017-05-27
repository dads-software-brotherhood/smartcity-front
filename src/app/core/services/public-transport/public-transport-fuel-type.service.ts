import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

import { PublicTransportFuelType } from '../../models/public-transport-fuel-type';

const baseRestPath = '/public-transport-fuel-type';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;

@Injectable()
export class PublicTransportFuelTypeService {

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

  public getAll(): Observable<Array<PublicTransportFuelType>> {
    return this.remoteConnectionService.getAsObservable(baseGetUserUrl)
      .map(response => response.json());
  }

}
