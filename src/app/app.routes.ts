import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './template/page-not-found/page-not-found.component';

// From modules
import { LoginRoutes } from './modules/login/index';
import { SignupRoutes } from './modules/signup/index';
import { ForgotPasswordRoutes } from './modules/forgot-password/index';
import { RestorePasswordRoutes } from './modules/restore-password/index';
import { SmartCitiesRoutes } from './modules/smart-cities/index';

export const appRoutes: Routes = [
  ... LoginRoutes,
  ... SignupRoutes,
  ... ForgotPasswordRoutes,
  ... RestorePasswordRoutes,
  ... SmartCitiesRoutes,
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
