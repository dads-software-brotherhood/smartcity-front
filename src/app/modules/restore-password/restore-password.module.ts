import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RestorePasswordComponent } from './restore-password.component';

// Elementos del template
import { TemplateModule } from '../../template/template.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TemplateModule
  ],
  declarations: [RestorePasswordComponent],
  exports: [RestorePasswordComponent]
})
export class RestorePasswordModule { }
