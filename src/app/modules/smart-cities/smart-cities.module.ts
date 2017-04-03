import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SmartCitiesComponent } from './smart-cities.component';

// Se van a borrar
import { HomeSmartCitiesComponent } from './components/home-smart-cities/home-smart-cities.component';

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
    HomeSmartCitiesComponent,
    PublicTransportComponent,
    PublicTransportDetailComponent
  ],
  exports: [
    SmartCitiesComponent
  ]
})
export class SmartCitiesModule { }
