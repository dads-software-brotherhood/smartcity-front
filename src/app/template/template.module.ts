import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { FooterComponent } from './footer/footer.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { TopMenuComponent } from './top-menu/top-menu.component';

import { LoginService } from '../core/services/login/login.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  declarations: [
    FooterComponent,
    MainMenuComponent,
    TopMenuComponent
  ],
  exports: [
    FooterComponent,
    MainMenuComponent,
    TopMenuComponent
  ],
  providers: [
    LoginService
  ]
})
export class TemplateModule { }
