import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './template/page-not-found/page-not-found.component';

// Módulos de la aplicación
import { LoginModule } from './modules/login/login.module';
import { SignupModule } from './modules/signup/signup.module';
import { ForgotPasswordModule } from './modules/forgot-password/forgot-password.module';
import { RestorePasswordModule } from './modules/restore-password/restore-password.module';

import { DashModule } from './modules/dash/dash.module'; // Se va a borrar

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
    PageNotFoundComponent
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
    ForgotPasswordModule,
    RestorePasswordModule,
    DashModule
  ],
  providers: [
    LoginService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
