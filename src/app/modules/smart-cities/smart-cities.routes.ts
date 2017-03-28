import { Routes } from '@angular/router';

import { SmartCitiesComponent } from './index';
import { UserAccountRoutes } from './modules/user-account/index';
import { NotificationTrayRoutes } from './modules/notification-tray/index';

import { HomeSmartCitiesComponent } from './components/home-smart-cities/home-smart-cities.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerFormComponent } from './components/customer/customer-form.component';

import { LoggedInGuard } from '../../core/services/login/logged-in.guard';
import { PublicTransportComponent } from './components/public-transport/public-transport.component';
import { PublicTransportDetailComponent } from './components/public-transport/public-transport-detail.component';

import { UserManagerRoutes } from './modules/user-manager/index';
import { UserVehicleRoutes } from './modules/user-vehicle/index';

export const SmartCitiesRoutes: Routes = [
  {
    path: 'smart-cities',
    component: SmartCitiesComponent,
    canActivate: [ LoggedInGuard ],
    children: [
      { path: 'customers', component: CustomerComponent, canActivate: [ LoggedInGuard ]},
      { path: 'customer/:id', component: CustomerFormComponent, canActivate: [LoggedInGuard] },
      { path: 'transports', component: PublicTransportComponent, canActivate: [ LoggedInGuard ]},
      { path: 'transport/:id', component: PublicTransportDetailComponent, canActivate: [ LoggedInGuard ]},
      { path: '', component: HomeSmartCitiesComponent, canActivate: [ LoggedInGuard ]},
      ... UserAccountRoutes,
      ... NotificationTrayRoutes,
      ... UserManagerRoutes,
      ... UserVehicleRoutes
    ]
  }
];
