import { Routes } from '@angular/router';

import { PublicTransportComponent } from './index';

import { PublicTransportDetailComponent } from './components/public-transport-detail/public-transport-detail.component';
import { PublicTransportManagerComponent } from './components/public-transport-manager/public-transport-manager.component';

import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';
import { LoggedInTransportAdminGuard } from '../../../../core/services/login/logged-in-transport-admin.guard';

export const PublicTransportRoutes: Routes = [
  {
    path: 'public-transport',
    component: PublicTransportComponent,
    canActivate: [ LoggedInGuard, LoggedInTransportAdminGuard ],
    children: [
      { path: 'detail', component: PublicTransportDetailComponent, canActivate: [ LoggedInGuard, LoggedInTransportAdminGuard ]},
      { path: 'detail/:id', component: PublicTransportDetailComponent, canActivate: [ LoggedInGuard, LoggedInTransportAdminGuard ]},
      { path: 'manager', component: PublicTransportManagerComponent, canActivate: [ LoggedInGuard, LoggedInTransportAdminGuard ]}
    ]
  }
];
