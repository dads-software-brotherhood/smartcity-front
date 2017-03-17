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

// Servicios de la aplicación
import { RemoteService } from './core/common/remote.service';
import { LoginService } from './core/services/login/login.service';
import { LoggedInGuard } from './core/services/login/logged-in.guard';
import { CustomerService } from './core/services/customer/customer.service';

// Rutas
import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
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
    SmartCitiesModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    RemoteService,
    LoginService,
    LoggedInGuard,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
