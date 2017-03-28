import { Routes } from '@angular/router';

import { UserManagerComponent } from './index';
import { LoggedInGuard } from '../../../../core/services/login/logged-in.guard';

import {UserManagerRegisterComponent} from './components/user-manager-register/user-manager-register.component';
import {UserManagerTrayComponent} from './components/user-manager-tray/user-manager-tray.component';
export const UserManagerRoutes: Routes = [
  {
    path: 'user-manager',component: UserManagerComponent,canActivate: [ LoggedInGuard ],
    children: [
      { path: 'user-register', component: UserManagerRegisterComponent},
      { path: 'user-manager-tray', component: UserManagerTrayComponent}
          ]
  }
];