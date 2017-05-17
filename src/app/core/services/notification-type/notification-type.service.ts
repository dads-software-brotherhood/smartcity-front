import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';

import { NotificationType } from '../../models/notification-type';

import { RemoteUtils } from '../../common/remote-utils';

const baseRestPath = '/notifications';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;
const notitificationProfileUrl = '/notifications';

@Injectable()
export class NotificationTypeService extends RemoteUtils{

   constructor(private http: Http, private loginService: LoginService,private remoteConnectionService: RemoteConnectionService) {
    super(loginService);
  }

  public getAll(): Observable<Array<NotificationType>> {
    return this.remoteConnectionService.getAsObservable(baseGetUserUrl)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

   loadNotificationByUserId(id: string): Observable<Array<NotificationType>> {
    const requestOptions: RequestOptions = this.buildRequestOptions();
    return this.remoteConnectionService.getAsObservable(this.buildNotificationByIdUrl(id))
    .map((res: Response) => {
         return res.json();
      })
   .catch(this.handleError);
  }

   private buildNotificationByIdUrl(id: string) {
    return baseGetUserUrl + '/' + id + notitificationProfileUrl;
  }

}
