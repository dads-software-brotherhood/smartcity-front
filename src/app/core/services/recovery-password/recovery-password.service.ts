import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { LoginService } from '../login/login.service';
import { RemoteConnectionService } from '../remote-connection/remote-connection.service';

import { environment } from '../../../../environments/environment';

const baseForgotPasswordPath = environment.backend_sdk + '/forgot-password';

@Injectable()
export class RecoveryPasswordService {

  constructor(private remoteConnectionService: RemoteConnectionService, private loginService: LoginService) {}

  public forgotPassword(email: string): Observable<any> {
    const url = baseForgotPasswordPath + '/' + email;

    return this.remoteConnectionService.postAsObservable(url)
    .catch((error) => {
      console.error('Error at fortgot password');
      console.error(error);
      return null;
    });
  }

}
