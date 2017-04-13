import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { VehicleType } from '../../models/vehicle-type';
import { LoginService } from '../login/login.service';

import { environment } from '../../../../environments/environment';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

const vehicleTypesUrl = environment.backend_sdk;

@Injectable()
export class VehicleTypeService {

  loginServ: LoginService;
  private url: string;

  constructor(private http: Http, private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

  getAll(): Observable<Array<VehicleType>> {
    return this.remoteConnectionService.getAsObservable(this.buildByIdUserUrl(), null, null, null)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  insert(vehicleTypesModel: VehicleType): Promise<VehicleType> {
    const requestOptions: RequestOptions = this.buildRequestOptions('application/json');

    return this.http.post(this.buildByIdUserUrl(), JSON.stringify(vehicleTypesModel), requestOptions).toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  update(vehicleTypesModel: VehicleType, id: string): Promise<boolean> {
    const requestOptions: RequestOptions = this.buildRequestOptions('application/json');

    return this.http.put(this.buildByIdUserUrl() + id, JSON.stringify(vehicleTypesModel), requestOptions).toPromise()
    .then((res: Response) => {return true;})
    .catch(this.handleError);
  }

  delete(id: string): Promise<boolean> {
    const requestOptions: RequestOptions = this.buildRequestOptions();

    return this.http.delete(this.buildByIdUserUrl() + id, requestOptions).toPromise()
    .then((res: Response) => {return true;})
    .catch(this.handleError);
  }

  private buildByIdUserUrl() {
    return vehicleTypesUrl + '/vehicletype/';
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