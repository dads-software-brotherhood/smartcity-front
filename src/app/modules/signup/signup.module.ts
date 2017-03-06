import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './signup.component';

// Elementos del template
import { TemplateModule } from '../../template/template.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    RouterModule,
    TemplateModule
  ],
  declarations: [
    SignupComponent
  ],
  exports: [
    SignupComponent
  ]
})
export class SignupModule { }
