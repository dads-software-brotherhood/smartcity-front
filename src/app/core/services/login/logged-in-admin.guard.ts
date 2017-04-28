import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class LoggedInAdminGuard implements CanActivate {

  constructor(private loginService: LoginService) {
  }

  canActivate() {
    return this.loginService.isAdmin() || this.loginService.isSA();
  }

}
