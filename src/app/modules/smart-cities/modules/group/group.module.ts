import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';

import { GroupComponent } from './group.component';
import { GroupTrayComponent } from './components/group-tray/group-tray.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
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
    GroupComponent,
    GroupTrayComponent,
    GroupDetailComponent
  ],
  exports: [
    GroupTrayComponent, GroupDetailComponent
  ]
})
export class GroupModule { }
