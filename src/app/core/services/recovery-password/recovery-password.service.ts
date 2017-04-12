import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';
import { constants } from '../../common/constants';

const forgotPasswordUrl = environment.backend_sdk + '/forgot-password';
const validTokenUrl = environment.backend_sdk + '/valid-token';
const restorePasswordUrl = environment.backend_sdk + '/restore-password';

@Injectable()
export class RecoveryPasswordService {

  constructor(private remoteConnectionService: RemoteConnectionService) {}

  public forgotPassword(email: string): Observable<any> {
    const payload = {
      'username' : email
    };

    return this.remoteConnectionService.postAsObservable(forgotPasswordUrl, JSON.stringify(payload), constants.contentTypeJson);
  }

  public isValidToken(token: string): Observable<any> {
    const headers: Headers = this.buildRecoveryHeader(token);

    return this.remoteConnectionService.getAsObservable(validTokenUrl, null, null, null, headers);
  }

  public restorePassword(token: string, password: string): Observable<any> {
    const headers: Headers = this.buildRecoveryHeader(token);

    const payload = {
      'password' : password
    };

    return this.remoteConnectionService.postAsObservable(restorePasswordUrl,
      JSON.stringify(payload), constants.contentTypeJson, null, headers);
  }

  private buildRecoveryHeader(token: string): Headers {
    const headers: Headers = new Headers();
    headers.append(constants.recoveryToken, token);

    return headers;
  }

}
