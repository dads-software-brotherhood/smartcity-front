import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../core/services/login/login.service';
import { IdentityUser } from '../../core/models/identity-user';

import { constants } from '../../core/common/constants';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.sass']
})
export class TopMenuComponent implements OnInit {

  identityUser: IdentityUser;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.identityUser = this.loginService.getLoggedUser();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(constants.logoutRoute);
  }

}
