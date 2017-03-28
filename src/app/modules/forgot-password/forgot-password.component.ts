import { Component, OnInit } from '@angular/core';
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
export class ForgotPasswordComponent implements OnInit {

  complexForm: FormGroup;

  constructor(private recoveryPasswordService: RecoveryPasswordService, private router: Router, fb: FormBuilder) {
    this.complexForm = fb.group({
      'email': [null, [Validators.required, CustomValidators.email]]
    });
  }

  ngOnInit() {
  }

  submitForm(form: any) {
    this.recoveryPasswordService.forgotPassword(form.email).subscribe(
      (res) => {
        alert('Message\nA verification message will be send to your mailbox.\nOnce you have receivied the token, you will be able to choise a new password for your account');

        this.router.navigate(constants.logoutRoute);
      }
    );
  }

}
