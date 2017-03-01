import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { DashComponent } from './dash.component';

import { TemplateModule } from '../../template/template.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    TemplateModule
  ],
  declarations: [
    DashComponent
  ],
  exports: [
    DashComponent
  ]
})
export class DashModule { }
