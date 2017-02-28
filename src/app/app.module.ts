import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Módulos de la aplicación
import { LoginModule } from './modules/login/login.module';
import { SignupModule } from './modules/signup/signup.module';

import { DashModule } from './modules/dash/dash.module'; //Se va a borrar

// Componentes de la aplicación
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { PruebaComponent } from './components/prueba/prueba.component';

// Servicios de la aplicación
import { LoginService } from './services/login/login.service';
import { LoggedInGuard } from './services/login/logged-in.guard';

// Rutas
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    PageNotFoundComponent,
    ForgotPasswordComponent,
    RestorePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    LoginModule,
    SignupModule,
    DashModule
  ],
  providers: [
    LoginService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
