import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

const baseForgotPasswordUrl = environment.backend_sdk + '/forgot-password';
const validTokenUrl = environment.backend_sdk + '/valid-token';
const restorePasswordUrl = environment.backend_sdk + '/restore-password';

@Injectable()
export class RecoveryPasswordService {

  constructor(private remoteConnectionService: RemoteConnectionService, private loginService: LoginService) {}

  public forgotPassword(email: string): Observable<any> {
    const url = baseForgotPasswordUrl + '/' + email;

    return this.remoteConnectionService.postAsObservable(url);
  }

  public isValidToken(token: string): Observable<any> {
    const headers:Headers = this.buildRecoveryHeader(token);

    return this.remoteConnectionService.getAsObservable(validTokenUrl, null, null, null, headers);
  }

  public restorePassword(token: string, password: string): Observable<any> {
    const headers:Headers = this.buildRecoveryHeader(token);
    headers.append('Content-Type', 'application/json');

    const payload = {
      'password' : password
    }

    return this.remoteConnectionService.postAsObservable(restorePasswordUrl, JSON.stringify(payload), '', null, headers);
  }

  private buildRecoveryHeader(token: string): Headers {
    const headers: Headers = new Headers();
    headers.append(constants.recoveryToken, token);

    return headers;
  }

}
