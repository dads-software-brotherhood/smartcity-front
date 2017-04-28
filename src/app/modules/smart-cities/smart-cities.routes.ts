import { Routes } from '@angular/router';

import { SmartCitiesComponent } from './index';
import { UserAccountRoutes } from './modules/user-account/index';
import { NotificationRoutes } from './modules/notification/index';

import { HomeSmartCitiesComponent } from './components/home-smart-cities/home-smart-cities.component';

import { LoggedInGuard } from '../../core/services/login/logged-in.guard';
import { LoggedInAdminGuard } from '../../core/services/login/logged-in-admin.guard';

import { PublicTransportComponent } from './components/public-transport/public-transport.component';
import { PublicTransportDetailComponent } from './components/public-transport/public-transport-detail.component';

import { UserManagerRoutes } from './modules/user-manager/index';
import { UserVehicleRoutes } from './modules/user-vehicle/index';
import { GroupRoutes } from './modules/group/index';
import { VehicleTypesRoutes } from './modules/vehicle-type/index';

export const SmartCitiesRoutes: Routes = [
  {
    path: 'smart-cities',
    component: SmartCitiesComponent,
    canActivate: [ LoggedInGuard ],
    children: [
      { path: 'transports', component: PublicTransportComponent, canActivate: [ LoggedInGuard, LoggedInAdminGuard ]},
      { path: 'transport/:id', component: PublicTransportDetailComponent, canActivate: [ LoggedInGuard, LoggedInAdminGuard ]},
      { path: '', component: HomeSmartCitiesComponent, canActivate: [ LoggedInGuard ]},
      ... UserAccountRoutes,
      ... NotificationRoutes,
      ... UserManagerRoutes,
      ... UserVehicleRoutes,
      ... GroupRoutes,
      ... VehicleTypesRoutes
    ]
  }
];
