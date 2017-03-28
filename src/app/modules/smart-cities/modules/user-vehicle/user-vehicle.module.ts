import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';

import { UserVehicleComponent } from './user-vehicle.component';
import { UserVehicleTrayComponent } from './components/user-vehicle-tray/user-vehicle-tray.component';
import { UserVehicleDetailComponent } from './components/user-vehicle-detail/user-vehicle-detail.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2PaginationModule
  ],
  declarations: [
    UserVehicleComponent,
    UserVehicleTrayComponent,
    UserVehicleDetailComponent
  ],
  exports: [
    UserVehicleTrayComponent, UserVehicleDetailComponent
  ]
})
export class UserVehicleModule { }
