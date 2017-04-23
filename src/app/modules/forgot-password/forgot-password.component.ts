import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { constants } from '../../core/common/constants';

import { RecoveryPasswordService } from '../../core/services/recovery-password/recovery-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  complexForm: FormGroup;
  private forgotPasswordSubs: any;

  showDialog: boolean;
  showErrorDialog: boolean;
  messageModal: string;

  constructor(private recoveryPasswordService: RecoveryPasswordService, private router: Router, fb: FormBuilder) {
    this.complexForm = fb.group({
      'email': [null, [Validators.required, CustomValidators.email]]
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.forgotPasswordSubs) {
      this.forgotPasswordSubs.unsubscribe();
    }
  }

  submitForm(form: any) {
    this.forgotPasswordSubs = this.recoveryPasswordService.forgotPassword(form.email).subscribe(
      (res) => {
        this.showMessage('A verification token will be sent to your mailbox. Once you have received the token, you will be able to choose a new password for your account');
      },
      (error) => {
        this.showErrorMessage('There was a communication error, please try later.');
        console.error(error);
      }
    );
  }

  private showMessage(message: string) {
    this.messageModal = message;
    this.showDialog = true;
  }

  private showErrorMessage(message: string) {
    this.messageModal = message;
    this.showErrorDialog = true;
  }

  onContinue() {
    this.router.navigate(constants.logoutRoute);
  }

}
