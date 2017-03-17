import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../core/services/login/login.service';
import { IdentityUser } from '../../core/models/identity-user';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.sass']
})
export class TopMenuComponent implements OnInit {

  identityUser: IdentityUser;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.identityUser = this.loginService.getLoggedUser();
  }

  logout() {
    this.loginService.logout();
  }

}
