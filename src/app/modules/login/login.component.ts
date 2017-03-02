import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from '../../services/login/login.service';

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
    const user1 = 'karen.najera';
    const user2 = 'blanca.vazquez';

    if ((form.email == user1 && form.email == user1) || (form.email == user2 && form.email == user2) ) {
      this.loginError = false;
      this.router.navigate(['smart-cities']);
    } else {
      this.loginError = true;

    }
    
    // this.loginService.login(form.email, form.email).subscribe((result) => {
    //   if (result) {
    //     console.log(result);
    //
    //     if (this.loginService.isLoggedIn()) {
    //       this.loginError = false;
    //       this.router.navigate(['smart-cities']);
    //     } else {
    //       this.loginError = true;
    //
    //     }
    //   } else {
    //     this.loginError = true;
    //   }
    // });
  }

}
