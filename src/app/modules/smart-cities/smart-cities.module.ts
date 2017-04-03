import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { SmartCitiesComponent } from './smart-cities.component';

// Se van a borrar
import { HomeSmartCitiesComponent } from './components/home-smart-cities/home-smart-cities.component';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerFormComponent } from './components/customer/customer-form.component';

// Elementos del template
import { TemplateModule } from '../../template/template.module';

// Submodulos
import { UserAccountModule } from './modules/user-account/user-account.module';
import { NotificationTrayModule } from './modules/notification-tray/notification-tray.module';

import { ModalPopupModule  } from '../../usable-component/modal-popup/modalpopup.module';
import { PublicTransportComponent } from './components/public-transport/public-transport.component';
import { PublicTransportDetailComponent } from './components/public-transport/public-transport-detail.component';

import { UserManagerModule } from './modules/user-manager/user-manager.module';
import { UserVehicleModule } from './modules/user-vehicle/user-vehicle.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NgbModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    UserAccountModule,
    NotificationTrayModule,
    TemplateModule,
    UserManagerModule,
    UserVehicleModule,
    ModalPopupModule
  ],
  declarations: [
    SmartCitiesComponent,
    CustomerComponent, // Se va a borrar
    CustomerFormComponent, //Se va a borrar
    HomeSmartCitiesComponent,
    PublicTransportComponent,
    PublicTransportDetailComponent
  ],
  exports: [
    SmartCitiesComponent
  ]
})
export class SmartCitiesModule { }
