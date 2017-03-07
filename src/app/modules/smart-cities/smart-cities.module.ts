import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Eliminar cuando ya no se tenga el componente de prueba

import { SmartCitiesComponent } from './smart-cities.component';

// Se van a borrar
import { HomeSmartCitiesComponent } from './components/home-smart-cities/home-smart-cities.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { CustomerComponent } from './components/customer/customer.component';

// Elementos del template
import { TemplateModule } from '../../template/template.module';

// Submodulos
import { UserAccountModule } from './modules/user-account/user-account.module';
import { NotificationTrayModule } from './modules/notification-tray/notification-tray.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    FormsModule, // Eliminar cuando ya no se tenga el componente de prueba
    UserAccountModule,
    NotificationTrayModule,
    TemplateModule
  ],
  declarations: [
    SmartCitiesComponent,
    PruebaComponent, // Se va a borrar
    CustomerComponent, // Se va a borrar
    HomeSmartCitiesComponent
  ],
  exports: [
    SmartCitiesComponent
  ]
})
export class SmartCitiesModule { }
