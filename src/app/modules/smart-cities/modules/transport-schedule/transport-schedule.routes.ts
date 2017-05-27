import { Routes } from '@angular/router';

import { TransportScheduleComponent } from './index';

import { AddScheduleComponent } from './components/add-schedule/add-schedule.component';
import { SearchScheduleComponent } from './components/search-schedule/search-schedule.component';

import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';
import { LoggedInTransportAdminGuard } from '../../../../core/services/login/logged-in-transport-admin.guard';

export const TransportScheduleRoutes: Routes = [
  {
    path: 'transport-schedule',
    component: TransportScheduleComponent,
    canActivate: [ LoggedInGuard, LoggedInTransportAdminGuard ],
    children: [
      { path: 'add-schedule', component: AddScheduleComponent, canActivate: [ LoggedInGuard, LoggedInTransportAdminGuard ]},
      { path: 'add-schedule/:id', component: AddScheduleComponent, canActivate: [ LoggedInGuard, LoggedInTransportAdminGuard ]},
      { path: 'search-schedule', component: SearchScheduleComponent, canActivate: [ LoggedInGuard, LoggedInTransportAdminGuard ]}
    ]
  }
];
