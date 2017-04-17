import { Routes } from '@angular/router';

import { VehicleTypeComponent } from './index';

import { VehicleTypeTrayComponent } from './components/vehicle-type-tray/vehicle-type-tray.component';
import { VehicleTypeDetailComponent } from './components/vehicle-type-detail/vehicle-type-detail.component';

import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';

export const VehicleTypesRoutes: Routes = [
  {
    path: 'vehicle-type',
    component: VehicleTypeComponent,
    canActivate: [ LoggedInGuard ],
    children: [
       { path: 'vehicleType', component: VehicleTypeTrayComponent, canActivate: [ LoggedInGuard ]},
       { path: 'vehicleTypeDetail/:id', component: VehicleTypeDetailComponent, canActivate: [ LoggedInGuard ]},
    ]
  }
];