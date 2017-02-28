import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TopMenuComponent } from '../../template/top-menu/top-menu.component';
import { MainMenuComponent } from '../../template/main-menu/main-menu.component';

import { DashComponent } from './dash.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TopMenuComponent,
    MainMenuComponent,
    DashComponent
  ],
  exports: [
    DashComponent
  ]
})
export class DashModule { }
