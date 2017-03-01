import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashComponent } from './dash.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    DashComponent
  ],
  exports: [
    DashComponent
  ]
})
export class DashModule { }
