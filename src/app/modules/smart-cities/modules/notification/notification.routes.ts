import { Routes } from '@angular/router';
import { NotificationComponent } from './index';
import { NotificationTrayComponent } from './components/notification-tray/notification-tray.component';
import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';

export const NotificationRoutes: Routes = [
  {
    path: 'notification',
    component: NotificationComponent,
    canActivate: [ LoggedInGuard ],
    children: [
      { path: 'notification-tray/:id', component: NotificationTrayComponent, canActivate: [ LoggedInGuard ]}
    ]
  }
];
