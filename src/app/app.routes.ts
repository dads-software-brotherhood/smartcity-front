import { Routes } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { SignupComponent } from './components/signup/signup.component';

import { LoggedInGuard } from './services/login/logged-in.guard';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login',      component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotPassword',      component: ForgotPasswordComponent },
  { path: 'restorePassword', component: RestorePasswordComponent },
  { path: 'prueba',      component: PruebaComponent, canActivate: [LoggedInGuard]},
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];
