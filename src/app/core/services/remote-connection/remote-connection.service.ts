import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { LoginService } from '../login/login.service';
import { RemoteUtils } from '../../common/remote-utils';

@Injectable()
export class RemoteConnectionService extends RemoteUtils {

    constructor(private http: Http, private loginService: LoginService) {
      super(loginService);
    }

    public getAsObservable(url: string, playload?: any, contentType?: string,
        params?: URLSearchParams, extraHeaders?: Headers): Observable<any> {
      const requestOptions: RequestOptions = this.buildRequestOptions(playload, contentType, params, extraHeaders);

      return this.http.get(url, requestOptions);
    }

    public getAsPromise(url: string, playload?: any, contentType?: string,
        params?: URLSearchParams, extraHeaders?: Headers): Promise<any> {
      const requestOptions: RequestOptions = this.buildRequestOptions(playload, contentType, params, extraHeaders);

      return this.http.get(url, requestOptions).toPromise();
    }

    public postAsObservable(url: string, playload?: any, contentType?: string,
        params?: URLSearchParams, extraHeaders?: Headers): Observable<any> {
      const requestOptions: RequestOptions = this.buildRequestOptions(null, contentType, params, extraHeaders);

      return this.http.post(url, playload, requestOptions);
    }

    public postAsPromise(url: string, playload?: any, contentType?: string,
        params?: URLSearchParams, extraHeaders?: Headers): Promise<any> {
      const requestOptions: RequestOptions = this.buildRequestOptions(null, contentType, params, extraHeaders);

      return this.http.post(url, playload, requestOptions).toPromise();
    }

    public putAsObservable(url: string, playload?: any, contentType?: string,
        params?: URLSearchParams, extraHeaders?: Headers): Observable<any> {
      const requestOptions: RequestOptions = this.buildRequestOptions(null, contentType, params, extraHeaders);

      return this.http.put(url, playload, requestOptions);
    }

    public putAsPromise(url: string, playload?: any, contentType?: string,
        params?: URLSearchParams, extraHeaders?: Headers): Promise<any> {
      const requestOptions: RequestOptions = this.buildRequestOptions(null, contentType, params, extraHeaders);

      return this.http.put(url, playload, requestOptions).toPromise();
    }

    public deleteAsObservable(url: string, playload?: any, contentType?: string,
        params?: URLSearchParams, extraHeaders?: Headers): Observable<any> {
      const requestOptions: RequestOptions = this.buildRequestOptions(playload, contentType, params, extraHeaders);

      return this.http.delete(url, requestOptions);
    }

    public deleteAsPromise(url: string, playload?: any, contentType?: string,
        params?: URLSearchParams, extraHeaders?: Headers): Promise<any> {
      const requestOptions: RequestOptions = this.buildRequestOptions(playload, contentType, params, extraHeaders);

      return this.http.delete(url, requestOptions).toPromise();
    }
}
