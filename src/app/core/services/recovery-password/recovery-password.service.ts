import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

const baseForgotPasswordPath = environment.backend_sdk + '/forgot-password';
const validRecoveryPassword = environment.backend_sdk + '/valid-token';

@Injectable()
export class RecoveryPasswordService {

  constructor(private remoteConnectionService: RemoteConnectionService, private loginService: LoginService) {}

  public forgotPassword(email: string): Observable<any> {
    const url = baseForgotPasswordPath + '/' + email;

    return this.remoteConnectionService.postAsObservable(url);
  }

  public isValidToken(token: string): Observable<any> {
    const headers:Headers = this.buildRecoveryHeader(token);

    return this.remoteConnectionService.getAsObservable(validRecoveryPassword, null, null, null, headers);
  }

  private buildRecoveryHeader(token: string): Headers {
    const headers: Headers = new Headers();
    headers.set(constants.recoveryToken, token);

    return headers;
  }

}
