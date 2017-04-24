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

  showDialog: boolean;
  showConfirmDialog: boolean;
  showErrorDialog: boolean;
  messageModal: string;

  form: any;

  constructor(private userProfileService: UserProfileService, private loginService: LoginService,
      private fb: FormBuilder, private router: Router) {
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
    this.form = form;
    this.showConfirmMessage('Are you sure you want to edit this information?');
  }

  private showMessage(message: string) {
    this.messageModal = message;
    this.showDialog = true;
  }

  private showConfirmMessage(message: string) {
    this.messageModal = message;
    this.showConfirmDialog = true;
  }

  private showErrorMessage(message: string) {
    this.messageModal = message;
    this.showErrorDialog = true;
  }

  onContinue() {
    this.router.navigate([constants.defaultLoggedRoute]);
  }

  onConfirm() {
    this.showConfirmDialog = false;

    const changePassword: ChangePassword = new ChangePassword();

    changePassword.original_password = this.form.oldPassword;
    changePassword.password = this.form.password;

    this.userProfileService.changePassword(changePassword).subscribe(
      (res) => {
        this.showMessage('The information was successfully saved');
      },
      (error) => {
        console.error(error);
        if (error && error.status && error.status === 500) {
          this.showErrorMessage('Invalid old password');
        } else {
          this.showErrorMessage('There was a communication error, please try later.');
        }
      }
    );

  }

}
