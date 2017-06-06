import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Group } from '../../models/group';
import { LoginService } from '../login/login.service';

import { environment } from '../../../../environments/environment';

const groupUrl = environment.backend_sdk + '/groups';
// const groupCountUrl = groupUrl + '/count'

@Injectable()
export class GroupService {

  loginServ: LoginService;
  private url: string;

  constructor(private http: Http, private loginService: LoginService) { }

  // count(): Observable<number> {
  //   const requestOptions: RequestOptions = this.buildRequestOptions();

  //   return this.http.get(groupCountUrl, requestOptions)
  //   .map(this.extractNumberBody)
  //   .catch(this.handleError);
  // }

  loadById(id: number): Promise<Group> {
    const requestOptions: RequestOptions = this.buildRequestOptions();

    return this.http.get(groupUrl + '/' + id, requestOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  getAll(limit?: number, offset?: number): Observable<Group[]> {
    const requestOptions: RequestOptions = this.buildRequestOptions();

    return this.http.get(groupUrl , requestOptions)
    .map(this.extractDataArray)
    .catch(this.handleError);
  }

  insert(group: Group): Promise<any> {
    const requestOptions: RequestOptions = this.buildRequestOptions('application/json');

    return this.http.post(groupUrl, JSON.stringify(group), requestOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  update(group: Group): Promise<any> {
    const requestOptions: RequestOptions = this.buildRequestOptions('application/json');

    return this.http.put(groupUrl + '/' + group.id, JSON.stringify(group), requestOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  delete(id: number): Promise<any> {
    const requestOptions: RequestOptions = this.buildRequestOptions();

    return this.http.delete(groupUrl + '/' + id, requestOptions).toPromise()
    .then((res: Response) => {
      return res;
    })
    .catch(this.handleError);
  }


  private buildRequestOptions(contentType?: string): RequestOptions {
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
    console.log(error);
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
