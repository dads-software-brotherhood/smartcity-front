import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { constants } from '../../common/constants';
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
    return this.remoteConnectionService.getAsObservable(this.buildVehicleTypeUrl(), null, null, null)
      .map((res: Response) => {
        return res.json();
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
  }

  insert(vehicleTypesModel: VehicleType): Observable<any> {
    return this.remoteConnectionService.postAsObservable(this.buildVehicleTypeUrl(),
    JSON.stringify(vehicleTypesModel), constants.contentTypeJson);
  }

  update(vehicleTypesModel: VehicleType, id: number): Observable<any> {
    return this.remoteConnectionService.putAsObservable(this.buildVehicleTypeUrl() + id,
    JSON.stringify(vehicleTypesModel), constants.contentTypeJson);
  }

  delete(id: number, type: string) {
    return this.remoteConnectionService.deleteAsObservable(this.buildVehicleTypeUrl() + id + '/type/' + type);
  }

  private buildVehicleTypeUrl() {
    return vehicleTypesUrl + '/vehicletype/';
  }
// tslint:disable-next-line:eofline
}