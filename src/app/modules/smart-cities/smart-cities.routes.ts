import { Routes } from '@angular/router';

import { SmartCitiesComponent } from './index';
import { UserAccountRoutes } from './modules/user-account/index';
import { NotificationTrayRoutes } from './modules/notification-tray/index';

import { PruebaComponent } from './components/prueba/prueba.component';
import { TelefonoComponent } from './components/telefono/telefono.component';

export const SmartCitiesRoutes: Routes = [
  {
    path: 'smart-cities',
    component: SmartCitiesComponent,
    children: [
      { path: 'prueba', component: PruebaComponent },
      { path: 'telefono', component: TelefonoComponent },
      ... UserAccountRoutes,
      ... NotificationTrayRoutes
    ]
  }
];
