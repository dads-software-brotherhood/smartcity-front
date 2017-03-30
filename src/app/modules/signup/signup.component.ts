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
        alert('Message\nYou must be validate your account....');
        this.router.navigate(constants.logoutRoute);
      },
      (error) => {
        if (error.status && error.status == 409) {
          alert('Error\nThis email is alredy register');
        } else {
          alert('An error...')
        }
      }
    );
  }

}
