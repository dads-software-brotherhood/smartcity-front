import { Routes } from '@angular/router';

import { UserVehicleComponent } from './index';

import { UserVehicleTrayComponent } from './components/user-vehicle-tray/user-vehicle-tray.component';
import { UserVehicleDetailComponent } from './components/user-vehicle-detail/user-vehicle-detail.component';

import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';

export const UserVehicleRoutes: Routes = [
  {
    path: 'user-vehicle',
    component: UserVehicleComponent,
    canActivate: [ LoggedInGuard ],
    children: [
      { path: 'vehicles', component: UserVehicleTrayComponent, canActivate: [ LoggedInGuard ]},
      { path: 'vehicle/:id', component: UserVehicleDetailComponent, canActivate: [ LoggedInGuard ]},
    ]
  }
];
