import { Routes } from '@angular/router';

import { SmartCitiesComponent } from './index';
import { UserAccountRoutes } from './modules/user-account/index';
import { NotificationTrayRoutes } from './modules/notification-tray/index';

import { HomeSmartCitiesComponent } from './components/home-smart-cities/home-smart-cities.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerFormComponent } from './components/customer/customer-form.component';

import { LoggedInGuard } from '../../core/services/login/logged-in.guard';
import { UserVehicleComponent } from './components/user-vehicle/user-vehicle.component';
import { UserVehicleDetailComponent } from './components/user-vehicle/user-vehicle-detail.component';

export const SmartCitiesRoutes: Routes = [
  {
    path: 'smart-cities',
    component: SmartCitiesComponent,
    canActivate: [ LoggedInGuard ],
    children: [
      { path: 'prueba', component: PruebaComponent, canActivate: [ LoggedInGuard ]},
      { path: 'customers', component: CustomerComponent, canActivate: [ LoggedInGuard ]},
      { path: 'customer/:id', component: CustomerFormComponent, canActivate: [LoggedInGuard] },
      { path: 'vehicles', component: UserVehicleComponent, canActivate: [ LoggedInGuard ]},
      { path: 'vehicle/:id', component: UserVehicleDetailComponent, canActivate: [ LoggedInGuard ]},
      { path: '', component: HomeSmartCitiesComponent, canActivate: [ LoggedInGuard ]},
      ... UserAccountRoutes,
      ... NotificationTrayRoutes
    ]
  }
];
