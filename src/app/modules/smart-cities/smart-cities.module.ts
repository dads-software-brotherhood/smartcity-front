import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Eliminar cuando ya no se tenga el componente de prueba

import { UserAccountModule } from './modules/user-account/user-account.module';

import { SmartCitiesComponent } from './smart-cities.component';

// Se van a borrar
import { PruebaComponent } from './components/prueba/prueba.component';
import { TelefonoComponent } from './components/telefono/telefono.component';


// import { TopMenuComponent } from '../../template/top-menu/top-menu.component';
// import { MainMenuComponent } from '../../template/main-menu/main-menu.component';
// import { FooterComponent } from '../../template/footer/footer.component';


import { TemplateModule } from '../../template/template.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NgbModule.forRoot(),
    FormsModule, // Eliminar cuando ya no se tenga el componente de prueba
    UserAccountModule,
    TemplateModule
  ],
  declarations: [
    // TopMenuComponent,
    // MainMenuComponent,
    // FooterComponent,
    SmartCitiesComponent,
    PruebaComponent, // Se va a borrar
    TelefonoComponent // Se va a borrar,

  ],
  exports: [
    SmartCitiesComponent
  ]
})
export class SmartCitiesModule { }
