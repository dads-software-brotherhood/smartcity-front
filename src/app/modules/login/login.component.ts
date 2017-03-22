import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../core/services/login/login.service';
import { LoginOauthService } from '../../core/services/login/login-oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  complexForm: FormGroup;

  loginError = false;

  constructor(private loginService: LoginService, private router: Router, fb: FormBuilder) {
    this.complexForm = fb.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  submitForm(form: any) {
    this.loginService.login(form.email, form.password).subscribe((result) => {
      console.log(result);
      if (result) {
        console.log(result);

        if (this.loginService.isLoggedIn()) {
          this.loginError = false;
          this.router.navigate(['smart-cities']);
        } else {
          this.loginError = true;

        }
      } else {
        this.loginError = true;
      }
    });
  }

}
