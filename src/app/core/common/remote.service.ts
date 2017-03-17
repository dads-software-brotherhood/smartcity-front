import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { LoginService } from '../services/login/login.service';

@Injectable()
export class RemoteService {

    constructor(private http: Http, private loginService: LoginService) { }

    public getObservable(url: string, playload?: any, contentType?: string, extraHeaders?: Headers): Observable<any> {
      const requestOptions: RequestOptions = this.buildRequestOptions(contentType, extraHeaders);

      return null;
    }

    private buildRequestOptions(contentType?: string, extraHeaders?: Headers): RequestOptions {
      const headers: Headers = new Headers();

      if (this.loginService.isLoggedIn()) {
        headers.append('X-Auth-Token', this.loginService.getToken());
      }

      if (contentType) {
        headers.append('Content-Type', contentType);
      }

      return new RequestOptions({ 'headers': headers });
    }

    private extractNumberBody(res: Response): number {
      return Number(res.text());
    }

    private extractTextBody(res: Response): string {
      return res.text();
    }

    private extractDataArray(res: Response) {
      const body = res.json();
      return body || [];
    }

    private extractData(res: Response) {
      const body = res.json();
      return body || {};
    }

    private handleError (error: Response | any) {
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
