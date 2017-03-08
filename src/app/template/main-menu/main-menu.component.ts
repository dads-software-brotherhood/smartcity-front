import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../core/services/login/login.service';
import { UserInfo } from '../../core/services/login/users';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnInit {

  isActive = false;
  showMenu = '';
  showSetting = '';

  userInfo: UserInfo;

  constructor(private loginService: LoginService) { }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addExpandSubClass(element: any) {
    if (element === this.showSetting) {
      this.showSetting = '0';
    } else {
      this.showSetting = element;
    }
  }

  ngOnInit() {
    this.userInfo = this.loginService.getUserInfo();
  }

  logout() {
    this.loginService.logout();
  }

}
