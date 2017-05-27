import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

import { PublicTransport } from '../../models/public-transport';

const baseRestPath = '/public-transport';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;

@Injectable()
export class PublicTransportService {

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

  public getAll(): Observable<Array<PublicTransport>> {
    return this.remoteConnectionService.getAsObservable(baseGetUserUrl)
      .map(response => response.json());
  }

  public findById(id: string): Observable<PublicTransport> {
    const url = baseGetUserUrl + '/' + id;

    return this.remoteConnectionService.getAsObservable(url)
      .map(response => response.json());
  }

  public insert(publicTransport: PublicTransport): Observable<PublicTransport> {
    return this.remoteConnectionService.postAsObservable(baseGetUserUrl, JSON.stringify(publicTransport), constants.contentTypeJson)
      .map((res: Response) => res = res.json());
  }

  public update(publicTransport: PublicTransport): Observable<any> {
    const url = baseGetUserUrl + '/' + publicTransport.id;

    return this.remoteConnectionService.putAsObservable(url, JSON.stringify(publicTransport), constants.contentTypeJson);
  }

  public delete(id: string): Observable<any> {
    const url = baseGetUserUrl + '/' + id;

    return this.remoteConnectionService.deleteAsObservable(url);
  }
}
