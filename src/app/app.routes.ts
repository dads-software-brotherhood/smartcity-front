import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { SignupComponent } from './components/signup/signup.component';

// From modules
import { LoginRoutes } from './modules/login/index';
import { SignupRoutes } from './modules/signup/index';
import { DashRoutes } from './modules/dash/index';

// Security
import { LoggedInGuard } from './services/login/logged-in.guard';


export const appRoutes: Routes = [
  ... LoginRoutes,
  ... SignupRoutes,
  ... DashRoutes,
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'restorePassword', component: RestorePasswordComponent },
  { path: 'prueba', component: PruebaComponent, canActivate: [LoggedInGuard]},
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
