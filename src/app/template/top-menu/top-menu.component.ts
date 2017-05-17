import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../core/services/login/login.service';
import { IdentityUser } from '../../core/models/identity-user';
import { NotificationType } from '../../core/models/notification-type';
import { NotificationTypeService }  from 'app/core/services/notification-type/notification-type.service';

import { constants } from '../../core/common/constants';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.sass']
})
export class TopMenuComponent implements OnInit {

  identityUser: IdentityUser;
  idUser:             string;
  isAdmin:            boolean;
  isSA:               boolean;
  isTransportAdmin:   boolean;
  isUser:             boolean;
  notifications:      Array<NotificationType>;
  isAccidents:        boolean;
  isAsthma:           boolean;
  isPollutation:      boolean;
  isPollen:           boolean;
  isTraffic:          boolean;
  isWeather:          boolean;

  constructor(private loginService: LoginService, private router: Router,private notificationTypeService: NotificationTypeService) {
  }

  ngOnInit() {
    this.identityUser = this.loginService.getLoggedUser();
    this.isAdmin = this.loginService.isAdmin();
    this.isSA = this.loginService.isSA();
    this.isTransportAdmin = this.loginService.isTransportAdmin();
    this.isUser = this.loginService.isUser();
    this.notifications = new Array<NotificationType>();
    if (this.isUser) {
      this.idUser = this.identityUser.id;
        this.notificationTypeService
        .loadNotificationByUserId(this.idUser).subscribe(
          notifications => {
            this.notifications = notifications;
            //Setting here for javascript asynchrone
            this.isAccidents = this.checkNotification(this.notifications, 'Accidents');
            this.isAsthma = this.checkNotification(this.notifications, 'AsthmaAttacks');
            this.isPollutation = this.checkNotification(this.notifications, 'Pollutions');
            this.isPollen = this.checkNotification(this.notifications, 'Pollen');
            this.isTraffic = this.checkNotification(this.notifications, 'TrafficJam');
            this.isWeather = this.checkNotification(this.notifications, 'WeatherConditions');
          }
      );

    }
  }

  checkNotification(notifications: Array<NotificationType>, notificationSearch: string): boolean {
    for (let i = 0; i < notifications.length; i++) {
      if ( notifications[i].id === notificationSearch) {
         return true;
      }
    }  
    return false;
  }

  logout() {
    this.loginService.logout().subscribe(
      (res) => {
        this.router.navigate(constants.logoutRoute);
      }
    );
  }

  toggleSidebar() {
      const dom: any = document.querySelector('body');
      dom.classList.toggle('push-right');
    }

    onChangeLocation(val) {
      this.router.navigate(['/smart-cities/notification/notification-all-user-tray/' + val]);
      location.reload();
    }

}
