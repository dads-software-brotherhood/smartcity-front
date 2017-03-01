import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password.component';

// Elementos del template
import { TemplateModule } from '../../template/template.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TemplateModule
  ],
  declarations: [ForgotPasswordComponent],
  exports: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
