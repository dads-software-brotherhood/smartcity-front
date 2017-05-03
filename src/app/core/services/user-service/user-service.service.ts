import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { constants } from '../../common/constants';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';
// import { Vehicle } from '../../models/vehicle';
import { LoginService } from '../login/login.service';
import {UserModel} from '../../models/user-model';
import { environment } from '../../../../environments/environment';
import 'rxjs/add/observable/throw';

const userModelUrl = environment.backend_sdk;
// const vehicleCountUrl = vehicleUrl + '/count'

@Injectable()
export class UserService {

  loginServ: LoginService;
  private url: string;

  constructor(private http: Http, private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) {
    // super(loginService);
   }

  // count(): Observable<number> {
  //   const requestOptions: RequestOptions = this.buildRequestOptions();

  //   return this.http.get(vehicleCountUrl, requestOptions)
  //   .map(this.extractNumberBody)
  //   .catch(this.handleError);
  // }

  getAll(): Observable<UserModel[]> {
    const requestOptions: RequestOptions = this.buildRequestOptions();

    return this.http.get(this.buildUserUrl() + '/list' , requestOptions)
      .map(this.extractDataArray)
      .catch(this.handleError);
  }
  public register(userModel: UserModel): Observable<any> {
    return this.remoteConnectionService.postAsObservable(this.buildUserUrl() +
      '/register', JSON.stringify(userModel), constants.contentTypeJson);
  }

  getBy(userModel: UserModel): Promise<any> {
    const requestOptions: RequestOptions = this.buildRequestOptions('application/json');
    return this.http.post(this.buildUserUrl() + '/filter', JSON.stringify(userModel), requestOptions)
      .toPromise()
      .then(this.extractDataArray)
      .catch(this.handleError);
  }


  insert(userModel: UserModel): Promise<any> {
    const requestOptions: RequestOptions = this.buildRequestOptions('application/json');
    return this.http.post(this.buildUserUrl() + '/register', JSON.stringify(userModel), requestOptions)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  delete(userModel: UserModel): Promise<any> {
    const requestOptions: RequestOptions = this.buildRequestOptions('application/json');

    return this.http.post(this.buildUserUrl() + '/delete', JSON.stringify(userModel), requestOptions)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private buildUserUrl() {
    return userModelUrl + '/admin/user';
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
    const body = res.text();
    return body;
  }
  private extractDataqry(res: Response) {
    const body = res.json();
    return body;
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
       const body = error.json();
       const err = body.error || JSON.stringify(body);
      errMsg = error.status.toString(); // `${error.status.toString()} - ${error.statusText || ''} ${err}`;
      console.log(errMsg);
    } else {
      errMsg =  error.status.tostring(); // error.message ? error.message : error.toString();
    }
    // console.error(errMsg);
    return Observable.throw(errMsg);
   }
}
