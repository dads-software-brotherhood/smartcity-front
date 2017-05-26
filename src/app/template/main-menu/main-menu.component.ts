import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../core/services/login/login.service';
import { IdentityUser } from '../../core/models/identity-user';

import { constants } from '../../core/common/constants';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.sass']
})
export class MainMenuComponent implements OnInit {

  isActive = false;
  showMenu = '';
  showSetting = '';
  showMenuManageSite = '';
  showMenuTransportSchedule ='';

  identityUser: IdentityUser;

  isAdmin:            boolean;
  isSA:               boolean;
  isTransportAdmin:   boolean;
  isUser:             boolean;

  constructor(private loginService: LoginService, private router: Router) { }

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

  addExpandshowMenuManageSite(element: any) {
    if (element === this.showMenuManageSite) {
      this.showMenuManageSite = '0';
    } else {
      this.showMenuManageSite = element;
    }
  }

  addExpandshowTransportSchedule(element: any) {
    if (element === this.showMenuTransportSchedule) {
      this.showMenuTransportSchedule = '0';
    } else {
      this.showMenuTransportSchedule = element;
    }
  }

  ngOnInit() {
    this.identityUser = this.loginService.getLoggedUser();
    this.isAdmin = this.loginService.isAdmin();
    this.isSA = this.loginService.isSA();
    this.isTransportAdmin = this.loginService.isTransportAdmin();
    this.isUser = this.loginService.isUser();
  }

  logout() {
    this.loginService.logout().subscribe(
      (res) => {
        this.router.navigate(constants.logoutRoute);
      }
    );
  }

  onChangeLocation(val) {
    this.router.navigate(['/smart-cities/notification/notification-all-user-tray/' + val]);
  }

}
