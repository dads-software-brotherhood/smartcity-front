import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { LoginService } from '../login/login.service';
import { RemoteUtils } from '../../common/rempote-utils';

@Injectable()
export class RemoteConnectionService extends RemoteUtils {

    constructor(private http: Http, private loginService: LoginService) {
      super();
    }

    public getAsObservable(url: string, playload: any, contentType?: string, params?: URLSearchParams, extraHeaders?: Headers): Observable<any> {
      const requestOptions: RequestOptions = this.buildRequestOptions(this.loginService, playload, contentType, params, extraHeaders);

      return this.http.get(url, requestOptions);
    }

    public getAsPromise(url: string, playload: any, contentType?: string, params?: URLSearchParams, extraHeaders?: Headers): Promise<any> {
      const requestOptions: RequestOptions = this.buildRequestOptions(this.loginService, playload, contentType, params, extraHeaders);

      return this.http.get(url, requestOptions).toPromise();
    }

}
