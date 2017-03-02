import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password.component';

// Elementos del template
import { TemplateModule } from '../../template/template.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    TemplateModule
  ],
  declarations: [ForgotPasswordComponent],
  exports: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
