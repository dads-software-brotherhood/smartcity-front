import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { UserProfileService } from '../../../../../../core/services/user-profile/user-profile.service';
import { LoginService } from '../../../../../../core/services/login/login.service';

import { ChangePassword } from '../../../../../../core/models/change-password';
import { IdentityUser } from '../../../../../../core/models/identity-user';

import { constants } from '../../../../../../core/common/constants';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.sass']
})
export class CredentialsComponent implements OnInit {

  identityUser: IdentityUser;
  complexForm: FormGroup;

  constructor(private userProfileService: UserProfileService, private loginService: LoginService, private fb: FormBuilder, private router: Router) {
    const passwordFormControl = new FormControl(null, [Validators.required, Validators.minLength(8)]);

    this.complexForm = fb.group({
      'oldPassword': [null, Validators.required],
      'password': passwordFormControl,
      'confirmPassword': [null, [Validators.required, CustomValidators.equalTo(passwordFormControl)]]
    });
  }

  ngOnInit() {
    this.identityUser = this.loginService.getLoggedUser();
  }

  submitForm(form: any) {
    const changePassword: ChangePassword = new ChangePassword();

    changePassword.original_password = form.oldPassword;
    changePassword.password = form.password;

    this.userProfileService.changePassword(changePassword).subscribe(
      (res) => {
        alert('All OK');
        this.router.navigate([constants.defaultLoggedRoute]);
      },
      (error) => {
        console.error(error);
        if (error && error.status && error.status === 500) {
          alert('Bad password');
        } else {
          alert('Unexpected Rrror')
        }
      }
    );

  }

}
