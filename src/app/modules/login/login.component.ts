import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
  }

  onSubmit(f: NgForm) {
    this.loginService.login(f.value.email, f.value.email).subscribe((result) => {
      if (result) {
        console.log(result);

        if (this.loginService.isLoggedIn()) {
          this.router.navigate(['smart-cities']);
        }
      }
    });
  }

}
