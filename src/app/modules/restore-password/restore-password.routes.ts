import { Route } from '@angular/router';
import { RestorePasswordComponent } from './index';

export const RestorePasswordRoutes: Route[] = [
  {
    path: 'restore-password/:token',
    component: RestorePasswordComponent
  }
];
