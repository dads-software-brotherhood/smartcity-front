import { Routes } from '@angular/router';

import { VehicleTypeComponent } from './index';

import { VehicleTypeTrayComponent } from './components/vehicle-type-tray/vehicle-type-tray.component';
import { VehicleTypeDetailComponent } from './components/vehicle-type-detail/vehicle-type-detail.component';

import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';
import { LoggedInAdminGuard } from '../../../../core/services/login/logged-in-admin.guard';

export const VehicleTypesRoutes: Routes = [
  {
    path: 'vehicle-type',
    component: VehicleTypeComponent,
    canActivate: [ LoggedInGuard, LoggedInAdminGuard ],
    children: [
       { path: 'vehicleType', component: VehicleTypeTrayComponent, canActivate: [ LoggedInGuard, LoggedInAdminGuard ]},
       { path: 'vehicleTypeDetail/:id', component: VehicleTypeDetailComponent, canActivate: [ LoggedInGuard, LoggedInAdminGuard ]},
    ]
  }
];
