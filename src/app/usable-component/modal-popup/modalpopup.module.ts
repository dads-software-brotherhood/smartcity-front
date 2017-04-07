import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ModalPopupComponent  } from './modalpopup.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpModule,
    NgbModule
  ],
  declarations: [
    ModalPopupComponent
  ],
  exports: [
    ModalPopupComponent
  ]
})
export class ModalPopupModule { }