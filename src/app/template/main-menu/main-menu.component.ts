import { Component, OnInit } from '@angular/core';

import { LoginService, UserInfo } from '../../services/login/login.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnInit {

  isActive = false;
  showMenu = '';

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

  ngOnInit() {
    this.userInfo = this.loginService.getUserInfo();
  }

  logout() {
    this.loginService.logout();
  }

}
