import { Routes } from '@angular/router';

import { VehicleTypeComponent } from './index';

import { VehicleTypeTrayComponent } from './components/vehicle-type-tray/vehicle-type-tray.component';
// import { UserVehicleDetailComponent } from './components/user-vehicle-detail/user-vehicle-detail.component';

import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';

export const VehicleTypesRoutes: Routes = [
  {
    path: 'vehicle-type',
    component: VehicleTypeComponent,
    canActivate: [ LoggedInGuard ],
    children: [
       { path: 'vehicleType', component: VehicleTypeTrayComponent, canActivate: [ LoggedInGuard ]},
    //   { path: 'vehicle-types/:id', component: UserVehicleDetailComponent, canActivate: [ LoggedInGuard ]},
    ]
  }
];