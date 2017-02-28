import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TopMenuComponent } from '../../template/top-menu/top-menu.component';
import { MainMenuComponent } from '../../template/main-menu/main-menu.component';

import { DashComponent } from './dash.component';

import { FooterComponent } from '../../template/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TopMenuComponent,
    MainMenuComponent,
    DashComponent,
    FooterComponent
  ],
  exports: [
    DashComponent
  ]
})
export class DashModule { }
