import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

import { Paginable } from '../../common/paginable';
import { TransportSchedule } from '../../models/transport-schedule';
import { Time } from '../../models/time';

const baseRestPath = '/transport-schedule';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;

@Injectable()
export class TransportScheduleService {

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

  public getAll(): Observable<Array<TransportSchedule>> {
    return this.remoteConnectionService.getAsObservable(baseGetUserUrl)
      .map((res: Response) => res = res.json());
  }

  public findByRouteName(routeName: string):Observable<Array<TransportSchedule>> {
    if (routeName == null || routeName === '') {
      return Observable.of([]);
    } else {
      const urLSearchParams: URLSearchParams = new URLSearchParams();
      urLSearchParams.append('routeName', routeName);

      return this.remoteConnectionService.getAsObservable(baseGetUserUrl, null, null, urLSearchParams)
        .map((res: Response) => res = res.json());
    }
  }

  public findByQueries(routeName: string, frequency: Time, idAgency: string,
      page: number, size: number): Observable<Paginable> {
    const urLSearchParams: URLSearchParams = new URLSearchParams();

    if (routeName) {
      urLSearchParams.append('routeName', routeName);
    }

    if (frequency) {
      if (frequency.hour) {
        urLSearchParams.append('frequencyHour', frequency.hour + '');
      }
      if (frequency.minute) {
        urLSearchParams.append('frequencyMinute', frequency.minute + '');
      }
    }

    if (idAgency) {
      urLSearchParams.append('idAgency', idAgency);
    }

    const url: string = baseGetUserUrl + '/page/' + page + '/' + size;

    return this.remoteConnectionService.getAsObservable(url, null, null, urLSearchParams)
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

    return this.remoteConnectionService.putAsObservable(url, JSON.stringify(transportSchedule), constants.contentTypeJson);
  }

}
