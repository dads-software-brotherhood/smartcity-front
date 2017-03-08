import { Routes } from '@angular/router';

import { SmartCitiesComponent } from './index';
import { UserAccountRoutes } from './modules/user-account/index';
import { NotificationTrayRoutes } from './modules/notification-tray/index';

import { HomeSmartCitiesComponent } from './components/home-smart-cities/home-smart-cities.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { CustomerComponent } from './components/customer/customer.component';

import { LoggedInGuard } from '../../core/services/login/logged-in.guard';

export const SmartCitiesRoutes: Routes = [
  {
    path: 'smart-cities',
    component: SmartCitiesComponent,
    canActivate: [ LoggedInGuard ],
    children: [
      { path: 'prueba', component: PruebaComponent, canActivate: [ LoggedInGuard ]},
      { path: 'customers', component: CustomerComponent, canActivate: [ LoggedInGuard ]},
      { path: '', component: HomeSmartCitiesComponent, canActivate: [ LoggedInGuard ]},
      ... UserAccountRoutes,
      ... NotificationTrayRoutes
    ]
  }
];
