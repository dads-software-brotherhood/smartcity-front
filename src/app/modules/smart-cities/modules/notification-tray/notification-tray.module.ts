import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { NotificationTrayComponent } from './notification-tray.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    RouterModule,
    FormsModule
  ],
  declarations: [NotificationTrayComponent],
  exports: [NotificationTrayComponent]
})
export class NotificationTrayModule { }
