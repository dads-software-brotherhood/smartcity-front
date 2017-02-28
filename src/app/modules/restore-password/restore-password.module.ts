import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RestorePasswordComponent } from './restore-password.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [RestorePasswordComponent],
  exports: [RestorePasswordComponent]
})
export class RestorePasswordModule { }
