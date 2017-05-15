import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { constants } from '../../common/constants';

@Injectable()
export class LoggedInAdminGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.loginService.isAdmin() || this.loginService.isSA()) {
      return true;
    } else {
      this.loginService.redirectUrl = state.url;
      this.router.navigate(constants.loginRoute);
      return false;
    }
  }

}
