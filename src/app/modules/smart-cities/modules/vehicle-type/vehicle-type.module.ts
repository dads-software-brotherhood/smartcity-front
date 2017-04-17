import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';

import { VehicleTypeComponent } from './vehicle-type.component';
import { VehicleTypeTrayComponent } from './components/vehicle-type-tray/vehicle-type-tray.component';
import { VehicleTypeDetailComponent } from './components/vehicle-type-detail/vehicle-type-detail.component';
import { ModalPopupModule  } from '../../../../usable-component/modal-popup/modalpopup.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2PaginationModule,
    ModalPopupModule
  ],
  declarations: [
    VehicleTypeComponent,
    VehicleTypeTrayComponent,
    VehicleTypeDetailComponent
  ],
  exports: [
      VehicleTypeTrayComponent,
      VehicleTypeDetailComponent
  ]
})
export class VehicleTypeModule { }
