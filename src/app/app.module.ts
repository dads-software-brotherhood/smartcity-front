import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { PruebaComponent } from './components/prueba/prueba.component';
import { SignupComponent } from './components/signup/signup.component';

import { LoginService } from './services/login/login.service';
import { LoggedInGuard } from './services/login/logged-in.guard';

import { appRoutes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    PruebaComponent,
    PageNotFoundComponent,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RestorePasswordComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    LoginService,
    LoggedInGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
