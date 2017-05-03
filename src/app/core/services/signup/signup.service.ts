import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

const registerUrl = environment.backend_sdk + '/register';
const registerValidTokenBaseUrl = environment.backend_sdk + '/register/validation/';

@Injectable()
export class SignupService {

  constructor(private remoteConnectionService: RemoteConnectionService) {}

  public register(username: string, password: string): Observable<any> {
    const payload = {
      'username': username,
      'password' : password
    };

    return this.remoteConnectionService.postAsObservable(registerUrl, JSON.stringify(payload), constants.contentTypeJson);
  }

  public validateToken(token: string): Observable<any> {
    const url = registerValidTokenBaseUrl + token;

    return this.remoteConnectionService.getAsObservable(url);
  }

}
