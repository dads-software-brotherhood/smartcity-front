import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Vehicle } from '../../models/vehicle';
import { LoginService } from '../login/login.service';

import { environment } from '../../../../environments/environment';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';
import { constants } from '../../common/constants';

const vehicleUrl = environment.backend_sdk;
// const vehicleCountUrl = vehicleUrl + '/count'

@Injectable()
export class VehicleService {

  loginServ: LoginService;
  private url: string;

  constructor(private http: Http, private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) {
  }

  getAll(): Observable<Array<Vehicle>> {
    return this.remoteConnectionService.getAsObservable(this.buildByIdUserUrl(), null, null, null)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  insert(vehicle: Vehicle): Observable<any> {
    return this.remoteConnectionService.postAsObservable(this.buildByIdUserUrl(), JSON.stringify(vehicle), constants.contentTypeJson);
  }

  update(vehicle: Vehicle, id: string): Observable<any> {
    return this.remoteConnectionService.putAsObservable(this.buildByIdUserUrl() + '/' + id, JSON.stringify(vehicle),
                                                        constants.contentTypeJson);
  }

  delete(id: string) {
    return this.remoteConnectionService.deleteAsObservable(this.buildByIdUserUrl() + '/' + id);
  }

  private buildByIdUserUrl() {
    return vehicleUrl + '/user-profile/' + this.loginService.getLoggedUser().id + '/vehicle';
  }

}
