import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';

import { PublicTransportComponent } from './public-transport.component';
import { PublicTransportDetailComponent } from './components/public-transport-detail/public-transport-detail.component';
import { PublicTransportManagerComponent } from './components/public-transport-manager/public-transport-manager.component';

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
    PublicTransportComponent,
    PublicTransportDetailComponent,
    PublicTransportManagerComponent
  ],
  exports: [
    PublicTransportDetailComponent,
    PublicTransportManagerComponent
  ]
})
export class PublicTransportModule { }
