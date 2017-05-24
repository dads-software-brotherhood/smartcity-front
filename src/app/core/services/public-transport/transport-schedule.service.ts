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
    return this.remoteConnectionService.getAsObservable(baseGetUserUrl)
      .map((res: Response) => res = res.json());
  }

  public getById(id: string): Observable<TransportSchedule> {
    const url = baseGetUserUrl + '/' + id;

    return this.remoteConnectionService.getAsObservable(url)
      .map((res: Response) => res = res.json());
  }

  public insert(transportSchedule: TransportSchedule): Observable<any> {
    return this.remoteConnectionService.postAsObservable(baseGetUserUrl, JSON.stringify(transportSchedule), constants.contentTypeJson)
      .map((res: Response) => res = res.json());
  }

  public update(transportSchedule: TransportSchedule): Observable<any> {
    const url = baseGetUserUrl + '/' + transportSchedule.id;

    return this.remoteConnectionService.postAsObservable(url, JSON.stringify(transportSchedule), constants.contentTypeJson)
      .map((res: Response) => res = res.json());
  }

}
