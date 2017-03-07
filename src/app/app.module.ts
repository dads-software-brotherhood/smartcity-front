import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './template/page-not-found/page-not-found.component';

// Módulos de la aplicación
import { LoginModule } from './modules/login/login.module';
import { SignupModule } from './modules/signup/signup.module';
import { ForgotPasswordModule } from './modules/forgot-password/forgot-password.module';
import { RestorePasswordModule } from './modules/restore-password/restore-password.module';
import { SmartCitiesModule } from './modules/smart-cities/smart-cities.module';

import { DashModule } from './modules/dash/dash.module'; // Se va a borrar

// Servicios de la aplicación
import { LoginService } from './core/services/login/login.service';
import { LoginOauthService } from './core/services/login/login-oauth.service';
import { LoggedInGuard } from './core/services/login/logged-in.guard';

// Rutas
import { appRoutes } from './app.routes';
import { EqualValidator } from './directives/equal-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    EqualValidator
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
    SmartCitiesModule,
    DashModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    LoginService,
    LoginOauthService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
