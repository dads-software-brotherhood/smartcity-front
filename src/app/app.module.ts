import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
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

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login',      component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgotPassword',      component: ForgotPasswordComponent },
  { path: 'restorePassword', component: RestorePasswordComponent },
  { path: 'prueba',      component: PruebaComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

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
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
