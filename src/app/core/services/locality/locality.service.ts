import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';

import { Locality } from '../../models/locality';

const baseRestPath = '/localities';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;

@Injectable()
export class LocalityService {

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

  public getByRegionId(regionId: number): Observable<Array<Locality>> {
    const urlSearchParams: URLSearchParams = new URLSearchParams();
    urlSearchParams.set('regionId', regionId + '');

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
