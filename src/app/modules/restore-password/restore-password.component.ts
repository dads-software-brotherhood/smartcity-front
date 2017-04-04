import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { constants } from '../../core/common/constants';

import { RecoveryPasswordService } from '../../core/services/recovery-password/recovery-password.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.sass']
})
export class RestorePasswordComponent implements OnInit, OnDestroy {

  complexForm: FormGroup;
  private token: string;

  private paramsSubs: any;
  private validTokenSubs: any;
  private restorePasswordSubs: any;

  constructor(private recoveryPasswordService: RecoveryPasswordService,
      private route: ActivatedRoute,
      private router: Router,
      fb: FormBuilder) {
    const password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

    this.complexForm = fb.group({
      'password': password,
      'confirmPassword': [null, [Validators.required, CustomValidators.equalTo(password)]]
    });
  }

  ngOnInit() {
    this.paramsSubs = this.route.params.subscribe((params: Params) => {
      this.token = params['token'];

      this.validTokenSubs = this.recoveryPasswordService.isValidToken(params['token'])
        .subscribe((res: any) => {
          console.log('token valid');
        },
        (error) => {
          alert('Your token is invalid');
          this.router.navigate(constants.logoutRoute);
        });
    });
  }

  ngOnDestroy() {
    this.unsusbcribe(this.paramsSubs);
    this.unsusbcribe(this.validTokenSubs);
    this.unsusbcribe(this.restorePasswordSubs);
  }

  private unsusbcribe(subscription: any) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  submitForm(form: any) {
    this.unsusbcribe(this.restorePasswordSubs);

    this.restorePasswordSubs = this.recoveryPasswordService.restorePassword(this.token, form.password).subscribe(
      (res) => {
        alert('Message\nYour password has been successfully changed');
        this.router.navigate(constants.logoutRoute);
      },
      (error) => {
        alert('Error communicating with server');
      }
    );
  }

}
