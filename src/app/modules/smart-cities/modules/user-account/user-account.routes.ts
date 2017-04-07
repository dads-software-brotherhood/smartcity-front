import { Routes } from '@angular/router';

import { UserAccountComponent } from './index';

import { CloseAccountComponent } from './components/close-account/close-account.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HealthProfileComponent } from './components/health-profile/health-profile.component';
import { AddressComponent } from './components/address/address.component';

import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';
import { LoggedInAdmin } from '../../../../core/services/login/logged-in-admin.guard';

export const UserAccountRoutes: Routes = [
  {
    path: 'user-account',
    component: UserAccountComponent,
    canActivate: [ LoggedInGuard ],
    children: [
      { path: 'close-account', component: CloseAccountComponent, canActivate: [ LoggedInGuard ]},
      { path: 'credentials', component: CredentialsComponent, canActivate: [ LoggedInGuard ]},
      { path: 'profile', component: ProfileComponent, canActivate: [ LoggedInAdmin ]},
      { path: 'address', component: AddressComponent, canActivate: [ LoggedInGuard ]},
      { path: 'address/:index', component: AddressComponent, canActivate: [ LoggedInGuard ]},
      { path: 'health-profile', component: HealthProfileComponent, canActivate: [ LoggedInGuard ]}
    ]
  }
];
