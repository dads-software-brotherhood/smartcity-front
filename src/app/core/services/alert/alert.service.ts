import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';

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

  private url: string;

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

  getAllByPage(page: string, size: string): Observable<Array<Alert>> {
    this.url = this.buildAlertUrl() + 'page/' + page + '/items/' + size;
    return this.remoteConnectionService.getAsObservable(this.url, null, null, null)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  getAllByTypeAlert(type: string, page: string, size: string): Observable<Array<Alert>> {
    this.url = this.buildAlertUrl() + 'type/' + type + '/page/' + page + '/items/' + size;
    return this.remoteConnectionService.getAsObservable(this.url, null, null, null)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  getAllByTypeSubTypeAlert(type: string, subtype: string, page: string, size: string): Observable<Array<Alert>> {
    this.url = this.buildAlertUrl() + 'type/' + type + '/subtype/' + subtype + '/page/' + page + '/items/' + size;
    return this.remoteConnectionService.getAsObservable(this.url, null, null, null)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }
     
   getAllByAlertDate(type: string, date: string, page: string, size: string): Observable<Array<Alert>> {
    this.url = this.buildAlertUrl() + 'type/' + type + '/date/' + date + '/page/' + page + '/items/' + size;
    return this.remoteConnectionService.getAsObservable(this.url, null, null, null)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
   }

   getAllByTypeSubTypeAlertDate(type: string, subtype: string, date: string, page: string, size: string): Observable<Array<Alert>> {
    this.url = this.buildAlertUrl() + 'type/' + type + '/subtype/' + subtype + '/date/' + date + '/page/' + page + '/items/' + size;
    return this.remoteConnectionService.getAsObservable(this.url, null, null, null)
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