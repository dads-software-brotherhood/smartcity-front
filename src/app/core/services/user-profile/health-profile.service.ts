import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { HealthProfile } from '../../models/health-profile';
import { LoginService } from '../login/login.service';

import { RemoteUtils } from '../../common/remote-utils';

import { environment } from '../../../../environments/environment';

const userProfileUrl = environment.backend_sdk + '/user-profile';
const healthProfileUrl = '/health-profile';

@Injectable()
export class HealthProfileService extends RemoteUtils {

  constructor(private http: Http, private loginService: LoginService) {
    super(loginService);
  }

  loadById(id: string): Promise<HealthProfile> {
    const requestOptions: RequestOptions = this.buildRequestOptions();

    return this.http.get(this.buildByIdUrl(id), requestOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  insert(id: string, healthProfile: HealthProfile): Promise<HealthProfile> {
    const requestOptions: RequestOptions = this.buildRequestOptions(null, 'application/json');

    return this.http.post(this.buildByIdUrl(id), JSON.stringify(healthProfile), requestOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  private buildByIdUrl(id: string) {
    return userProfileUrl + '/' + id + healthProfileUrl;
  }

}
