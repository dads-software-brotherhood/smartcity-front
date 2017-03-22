import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { LoginService } from '../services/login/login.service';

export class RemoteUtils {

  constructor() { }

  public buildRequestOptions(loginService?: LoginService, playload?: any, contentType?: string, params?: URLSearchParams, extraHeaders?: Headers): RequestOptions {
    const headers: Headers = new Headers();

    if (loginService && loginService.isLoggedIn()) {
      headers.append('X-Auth-Token', loginService.getToken());
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

  public extractNumberBody(res: Response): number {
    return Number(res.text());
  }

  public extractTextBody(res: Response): string {
    return res.text();
  }

  public extractDataArray(res: Response) {
    const body = res.json();
    return body || [];
  }

  public extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  public handleError (error: Response | any) {
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

}
