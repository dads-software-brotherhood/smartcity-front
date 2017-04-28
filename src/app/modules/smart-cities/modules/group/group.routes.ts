import { Routes } from '@angular/router';

import { GroupComponent } from './index';

import { GroupTrayComponent } from './components/group-tray/group-tray.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';

import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';
import { LoggedInAdminGuard } from '../../../../core/services/login/logged-in-admin.guard';

export const GroupRoutes: Routes = [
  {
    path: 'group',
    component: GroupComponent,
    canActivate: [ LoggedInGuard, LoggedInAdminGuard ],
    children: [
      { path: 'groups', component: GroupTrayComponent, canActivate: [ LoggedInGuard, LoggedInAdminGuard ]},
      { path: 'group/:id', component: GroupDetailComponent, canActivate: [ LoggedInGuard, LoggedInAdminGuard ]},
    ]
  }
];
