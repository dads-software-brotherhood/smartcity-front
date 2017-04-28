import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { constants } from '../../core/common/constants';

import { SignupService } from '../../core/services/signup/signup.service';

@Component({
  selector: 'app-account-verification',
  templateUrl: './account-verification.component.html',
  styleUrls: ['./account-verification.component.sass']
})
export class AccountVerificationComponent implements OnInit, OnDestroy {

  private paramsSubs: any;

  showTokenError: boolean;

  constructor(private route: ActivatedRoute, private router: Router, private signupService: SignupService) { }

  ngOnInit() {
    this.paramsSubs = this.route.params
    .switchMap((params: Params) => this.signupService.validateToken(params['token']))
    .subscribe(
      (res) => {
        this.router.navigate(constants.logoutRoute);
      },
      (error) => {
        this.showTokenError = true;
      }
    );
  }

  ngOnDestroy() {
    if (this.paramsSubs) {
      this.paramsSubs.unsubscribe();
    }
  }

}
