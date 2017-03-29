import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { constants } from '../../core/common/constants';

import { RecoveryPasswordService } from '../../core/services/recovery-password/recovery-password.service';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.sass']
})
export class RestorePasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private recoveryPasswordService: RecoveryPasswordService) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.recoveryPasswordService.isValidToken(params['token']))
      .subscribe((res: any) => {
        console.log('token valid');
      },
      (error) => {
        alert('Your token is invalid');
        this.router.navigate(constants.logoutRoute);
      });
  }

}
