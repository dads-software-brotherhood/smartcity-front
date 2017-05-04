import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {UserManagerComponent} from './user-manager.component';
import {UserManagerRegisterComponent} from './components/user-manager-register/user-manager-register.component';
import {UserManagerTrayComponent} from './components/user-manager-tray/user-manager-tray.component';
import { Ng2PaginationModule } from 'ng2-pagination';
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
  declarations: [UserManagerComponent, UserManagerRegisterComponent, UserManagerTrayComponent],
  exports: [UserManagerComponent, UserManagerRegisterComponent, UserManagerTrayComponent]
})
export class UserManagerModule { }
