import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { LoginService } from '../services/login/login.service';

export class RemoteUtils {

  constructor(private localLoginService: LoginService) { }

  protected buildRequestOptions(playload?: any, contentType?: string, params?: URLSearchParams, extraHeaders?: Headers): RequestOptions {
    let headers: Headers;

    if (extraHeaders) {
      headers = extraHeaders;
    } else {
      headers = new Headers();
    }

    headers.append('Access-Control-Allow-Origin', '*');

    if (this.localLoginService.isLoggedIn()) {
      headers.append('X-Auth-Token', this.localLoginService.getToken());
    }

    if (contentType) {
      headers.append('Content-Type', contentType);
    }

    const requestOptions: RequestOptions = new RequestOptions({ 'headers': headers });

    if (playload) {
      requestOptions.body = playload;
    }

    if (params) {
      requestOptions.search = params;
    }

    return requestOptions;
  }

  protected extractNumberBody(res: Response): number {
    return Number(res.text());
  }

  protected extractTextBody(res: Response): string {
    return res.text();
  }

  protected extractDataArray(res: Response) {
    const body = res.json();
    return body || [];
  }

  protected extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  protected handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  protected fixParam(param: any): string {
    if ( typeof param === 'string' ) {
      return param;
    } else if ( typeof param === 'boolean' || typeof param === 'number' ) {
      return param + '';
    } else if ( typeof param === 'string' ) {
      return param;
    } else {
      return null;
    }
  }

}
