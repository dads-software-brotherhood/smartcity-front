import { Routes } from '@angular/router';
import { NotificationComponent } from './index';
import { NotificationTrayComponent } from './components/notification-tray/notification-tray.component';
import { NotificationUserTrayComponent } from './components/notification-user-tray/notification-user-tray.component';
import { NotificationAllUserTrayComponent } from './components/notification-all-user-tray/notification-all-user-tray.component';
import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';
import { LoggedInAdminGuard } from '../../../../core/services/login/logged-in-admin.guard';

export const NotificationRoutes: Routes = [
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [ LoggedInGuard ],
    children: [
      { path: 'notification-tray/:id', component: NotificationTrayComponent, canActivate: [ LoggedInGuard, LoggedInAdminGuard ]},
      { path: 'notification-user-tray/:id', component: NotificationUserTrayComponent, canActivate: [ LoggedInGuard]},
      { path: 'notification-all-user-tray/:id', component: NotificationAllUserTrayComponent, canActivate: [ LoggedInGuard]}
    ]
  }
];
