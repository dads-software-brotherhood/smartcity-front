import { Routes } from '@angular/router';

import { VehicleTypeComponent } from './index';

// import { UserVehicleTrayComponent } from './components/user-vehicle-tray/user-vehicle-tray.component';
// import { UserVehicleDetailComponent } from './components/user-vehicle-detail/user-vehicle-detail.component';

import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';

export const UserVehicleRoutes: Routes = [
  {
    path: 'vehicle-type',
    component: VehicleTypeComponent,
    canActivate: [ LoggedInGuard ],
    children: [
    //   { path: 'vehicle-types', component: UserVehicleTrayComponent, canActivate: [ LoggedInGuard ]},
    //   { path: 'vehicle-types/:id', component: UserVehicleDetailComponent, canActivate: [ LoggedInGuard ]},
    ]
  }
];