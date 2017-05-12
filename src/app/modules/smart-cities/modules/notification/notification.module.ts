import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2PaginationModule } from 'ng2-pagination';

import { NotificationComponent } from './notification.component';
import { NotificationTrayComponent } from './components/notification-tray/notification-tray.component';
import { NotificationUserTrayComponent } from './components/notification-user-tray/notification-user-tray.component';
import { NotificationAllUserTrayComponent } from './components/notification-all-user-tray/notification-all-user-tray.component';
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
  declarations: [NotificationComponent, NotificationTrayComponent, NotificationUserTrayComponent, 
                 NotificationAllUserTrayComponent],
  exports: [NotificationTrayComponent, NotificationUserTrayComponent, NotificationAllUserTrayComponent]
})
export class NotificationModule { }
