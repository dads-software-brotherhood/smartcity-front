import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserAccountComponent } from './user-account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { CloseAccountComponent } from './components/close-account/close-account.component';
import { HealthProfileComponent } from './components/health-profile/health-profile.component';
import { AddressComponent } from './components/address/address.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    Ng2PaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProfileComponent,
    CredentialsComponent,
    CloseAccountComponent,
    UserAccountComponent,
    HealthProfileComponent,
    AddressComponent
  ],
  exports: [
    ProfileComponent, CredentialsComponent, CloseAccountComponent, UserAccountComponent
  ]
})
export class UserAccountModule { }
