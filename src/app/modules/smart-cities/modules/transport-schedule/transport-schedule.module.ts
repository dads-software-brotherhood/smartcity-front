import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';

import { TransportScheduleComponent } from './transport-schedule.component';
import { AddScheduleComponent } from './components/add-schedule/add-schedule.component';
import { SearchScheduleComponent } from './components/search-schedule/search-schedule.component';
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
    TransportScheduleComponent,
    AddScheduleComponent,
    SearchScheduleComponent
  ],
  exports: [
    AddScheduleComponent, SearchScheduleComponent
  ]
})
export class TransportScheduleModule { }
