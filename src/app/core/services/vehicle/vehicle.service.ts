import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Vehicle } from '../../models/vehicle';
import { LoginService } from '../login/login.service';

import { environment } from '../../../../environments/environment';

const vehicleUrl = environment.backend_sdk;
// const vehicleCountUrl = vehicleUrl + '/count'

@Injectable()
export class VehicleService {

  loginServ: LoginService;

  constructor(private http: Http, private loginService: LoginService) { }

  // count(): Observable<number> {
  //   const requestOptions: RequestOptions = this.buildRequestOptions();

  //   return this.http.get(vehicleCountUrl, requestOptions)
  //   .map(this.extractNumberBody)
  //   .catch(this.handleError);
  // }

  getAll(limit?: number, offset?: number): Observable<Vehicle[]> {
    const requestOptions: RequestOptions = this.buildRequestOptions();

    return this.http.get(this.buildByIdUserUrl() , requestOptions)
    .map(this.extractDataArray)
    .catch(this.handleError);
  }

  insert(vehicle: Vehicle): Promise<Vehicle> {
    const requestOptions: RequestOptions = this.buildRequestOptions('application/json');

    return this.http.post(this.buildByIdUserUrl(), JSON.stringify(vehicle), requestOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  private buildByIdUserUrl() {
    return vehicleUrl + '/user-profile/' + this.loginService.getLoggedUser().id + '/vehicle';
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
