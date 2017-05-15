import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

import { constants } from '../../common/constants';

@Injectable()
export class LoggedInUserGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.loginService.isUser()) {
      return true;
    } else {
      this.loginService.redirectUrl = state.url;
      this.router.navigate(constants.loginRoute);
      return false;
    }
  }

}
