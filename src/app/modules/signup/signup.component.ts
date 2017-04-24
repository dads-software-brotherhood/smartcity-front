import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { constants } from '../../core/common/constants';

import { SignupService } from '../../core/services/signup/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit, OnDestroy {

  complexForm: FormGroup;

  private registerSubs: any;

  showDialog: boolean;
  showErrorDialog: boolean;
  messageModal: string;

  constructor(private signupService: SignupService, private router: Router, fb: FormBuilder) {
    const password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

    this.complexForm = fb.group({
      'email': [null, [Validators.required, CustomValidators.email]],
      'password': password,
      'confirmPassword': [null, [Validators.required, CustomValidators.equalTo(password)]]
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsusbcribe(this.registerSubs);
  }

  private unsusbcribe(subscription: any) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  submitForm(form: FormGroup) {
    this.unsusbcribe(this.registerSubs);

    this.registerSubs = this.signupService.register(form.value.email, form.value.password).subscribe(
      (res) => {
        this.showMessage('The token has been sent to your mail, please check your tray');
      },
      (error) => {
        if (error.status && error.status === 409) {
          this.showErrorMessage('The email is already in use');
        } else {
          this.showErrorMessage('There was a communication error, please try later.');
        }
      }
    );
  }

  showMessage(message: string) {
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
