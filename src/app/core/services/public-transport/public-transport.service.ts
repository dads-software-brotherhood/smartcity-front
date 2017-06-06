import { forEach } from '@angular/router/src/utils/collection';
import { Injectable } from '@angular/core';
import { Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

import { PublicTransport } from '../../models/public-transport';
import { Time } from '../../models/time';

const baseRestPath = '/public-transport';
const baseGetUserUrl = environment.backend_sdk + baseRestPath;

@Injectable()
export class PublicTransportService {

  constructor(private loginService: LoginService, private remoteConnectionService: RemoteConnectionService) { }

  public getAll(): Observable<Array<PublicTransport>> {
    return this.remoteConnectionService.getAsObservable(baseGetUserUrl)
      .map(response => response.json());
  }

  public search(name: string, route:string,departureTime: Time, arrivalTime: Time, weekDays: string[]  ): Observable<Array<PublicTransport>> {
     const urLSearchParams: URLSearchParams = new URLSearchParams();
    if(name){
      urLSearchParams.append('name',name);
    }
    if(route){
      urLSearchParams.append('routename',route);
    }
    if(departureTime){
      urLSearchParams.append('departuretime', departureTime.hour + ':' + departureTime.minute);
    }
    if(arrivalTime){
      urLSearchParams.append('arrivaltime', arrivalTime.hour + ':' + arrivalTime.minute); 
    }
    if(weekDays){
      weekDays.forEach( weekDay => {
        urLSearchParams.append('weekday',weekDay);
      });

      }
    
    return this.remoteConnectionService.getAsObservable(baseGetUserUrl+'/search',null, null, urLSearchParams)
      .map(response => response.json());
  }

  public findById(id: string): Observable<PublicTransport> {
    const url = baseGetUserUrl + '/' + id;

    return this.remoteConnectionService.getAsObservable(url)
      .map(response => response.json());
  }

  public insert(publicTransport: PublicTransport): Observable<PublicTransport> {
    return this.remoteConnectionService.postAsObservable(baseGetUserUrl, JSON.stringify(publicTransport), constants.contentTypeJson)
      .map((res: Response) => res = res.json());
  }

  public update(publicTransport: PublicTransport): Observable<any> {
    const url = baseGetUserUrl + '/' + publicTransport.id;

    return this.remoteConnectionService.putAsObservable(url, JSON.stringify(publicTransport), constants.contentTypeJson);
  }

  public delete(id: string, removeReason: string): Observable<any> {
    const url = baseGetUserUrl + '/' + id;

    const urlSearchParams: URLSearchParams = new URLSearchParams();
    urlSearchParams.append('removeReason', removeReason);

    return this.remoteConnectionService.deleteAsObservable(url, null, null, urlSearchParams);
  }
}
