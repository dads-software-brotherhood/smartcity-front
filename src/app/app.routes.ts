import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './template/page-not-found/page-not-found.component';

// From modules
import { LoginRoutes } from './modules/login/index';
import { SignupRoutes } from './modules/signup/index';
import { ForgotPasswordRoutes } from './modules/forgot-password/index';
import { RestorePasswordRoutes } from './modules/restore-password/index';
import { SmartCitiesRoutes } from './modules/smart-cities/index';
import { DashRoutes } from './modules/dash/index';

// Security
import { LoggedInGuard } from './services/login/logged-in.guard';


export const appRoutes: Routes = [
  ... LoginRoutes,
  ... SignupRoutes,
  ... ForgotPasswordRoutes,
  ... RestorePasswordRoutes,
  ... SmartCitiesRoutes,
  ... DashRoutes,
//  { path: 'prueba', component: PruebaComponent, canActivate: [LoggedInGuard]},
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
