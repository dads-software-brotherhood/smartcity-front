import { Route } from '@angular/router';
import { SignupComponent } from './index';
import { AccountVerificationComponent } from './account-verification.component'

export const SignupRoutes: Route[] = [
  { path: 'signup', component: SignupComponent },
  { path: 'account-verification/:token', component: AccountVerificationComponent }
];
