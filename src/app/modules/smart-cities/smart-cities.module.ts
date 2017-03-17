import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Eliminar cuando ya no se tenga el componente de prueba
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SmartCitiesComponent } from './smart-cities.component';

// Se van a borrar
import { HomeSmartCitiesComponent } from './components/home-smart-cities/home-smart-cities.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerFormComponent } from './components/customer/customer-form.component';

// Elementos del template
import { TemplateModule } from '../../template/template.module';

// Submodulos
import { UserAccountModule } from './modules/user-account/user-account.module';
import { NotificationTrayModule } from './modules/notification-tray/notification-tray.module';

import {ModalPopupComponent  } from '../../usable-component/modal-popup/modalpopup.component';
import { UserVehicleComponent } from './components/user-vehicle/user-vehicle.component';
import { UserVehicleDetailComponent } from './components/user-vehicle/user-vehicle-detail.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    NgxDatatableModule,
    FormsModule, // Eliminar cuando ya no se tenga el componente de prueba
    ReactiveFormsModule, //Eliminar cuando ya no se tenga el componente de prueba
    UserAccountModule,
    NotificationTrayModule,
    TemplateModule
  ],
  declarations: [
    SmartCitiesComponent,
    PruebaComponent, // Se va a borrar
    CustomerComponent, // Se va a borrar
    CustomerFormComponent, //Se va a borrar
    ModalPopupComponent,
    HomeSmartCitiesComponent,
    UserVehicleComponent,
    UserVehicleDetailComponent
  ],
  exports: [
    SmartCitiesComponent
  ]
})
export class SmartCitiesModule { }
