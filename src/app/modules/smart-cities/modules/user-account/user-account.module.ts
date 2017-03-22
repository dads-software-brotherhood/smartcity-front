import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserAccountComponent } from './user-account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CredentialsComponent } from './components/credentials/credentials.component';
import { CloseAccountComponent } from './components/close-account/close-account.component';
import { HealthProfileComponent } from './components/health-profile/health-profile.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    RouterModule,
    FormsModule
  ],
  declarations: [
    ProfileComponent,
    CredentialsComponent,
    CloseAccountComponent,
    UserAccountComponent,
    HealthProfileComponent
  ],
  exports: [
    ProfileComponent, CredentialsComponent, CloseAccountComponent, UserAccountComponent
  ]
})
export class UserAccountModule { }
