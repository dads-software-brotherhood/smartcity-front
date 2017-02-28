import { Routes } from '@angular/router';

import { UserAccountComponent } from './index';

import { CloseAccountComponent } from './components/close-account/close-account.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { ProfileComponent } from './components/profile/profile.component';

export const UserAccountRoutes: Routes = [
  {
    path: 'user-account',
    component: UserAccountComponent,
    children: [
      { path: 'close-account', component: CloseAccountComponent },
      { path: 'credentials', component: CredentialsComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];
