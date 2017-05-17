import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { GroupProfile } from '../../models/group-profile';
import { NotificationType } from '../../models/notification-type';

import { LoginService } from '../login/login.service';

import { RemoteUtils } from '../../common/remote-utils';

import { environment } from '../../../../environments/environment';

import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

const userProfileUrl = environment.backend_sdk + '/user-profile';
const groupProfileUrl = '/groups';

@Injectable()
export class GroupProfileService extends RemoteUtils {
  observable: Observable<NotificationType[]>;

  constructor(private http: Http, private loginService: LoginService,private remoteConnectionService: RemoteConnectionService) {
    super(loginService);
  }

  loadById(id: string): Observable<GroupProfile[]> {
    const requestOptions: RequestOptions = this.buildRequestOptions();
    return this.remoteConnectionService.getAsObservable(this.buildByIdUrl(id))
    .map((res: Response) => {
        return res.json();
      })
   .catch(this.handleError);
  }

 loadPromiseById(id: string): Promise<Array<GroupProfile>> {
    const requestOptions: RequestOptions = this.buildRequestOptions();
     return this.http.get(this.buildByIdUrl(id), requestOptions).toPromise()
    .then(this.extractDataArray)
    .catch(this.handleError);
  }

patch(id: string, groups: Array<GroupProfile>): Promise<Array<GroupProfile>> {
    const requestOptions: RequestOptions = this.buildRequestOptions(null, 'application/json');

    return this.http.patch(this.buildByIdUrl(id), JSON.stringify(groups), requestOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  send(id: string, groupProfile: GroupProfile): Promise<GroupProfile[]> {
    const requestOptions: RequestOptions = this.buildRequestOptions(null, 'application/json');

    return this.http.post(this.buildByIdUrl(id), JSON.stringify(groupProfile), requestOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  private buildByIdUrl(id: string) {
    return userProfileUrl + '/' + id + groupProfileUrl;
  }

  

}
