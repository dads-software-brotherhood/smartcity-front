import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../core/services/login/login.service';
import { UserInfo } from '../../core/services/login/users';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.sass']
})
export class TopMenuComponent implements OnInit {

  userInfo: UserInfo;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.userInfo = this.loginService.getUserInfo();
  }

  logout() {
    this.loginService.logout();
  }

}
