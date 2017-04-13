import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserProfileService } from '../../../../../../core/services/user-profile/user-profile.service';
import { LoginService } from '../../../../../../core/services/login/login.service';

import { constants } from '../../../../../../core/common/constants';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.sass']
})
export class CloseAccountComponent implements OnInit {

  constructor(private userProfileService: UserProfileService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  cancelAccount() {
    if (this.loginService.isSA() || this.loginService.getLoggedUser().username === 'idm') {
      alert('Can\'t delete a SA account');
    } else {
      this.userProfileService.cancelAccount().subscribe(
        (res) => {
          alert('Your account has been successfully deleted');
          this.router.navigate([constants.defaultLoggedRoute]);
        },
        (error) => {
          console.error(error);
          alert('Can\'t cancel the account, try again later')
        }
      );
    }
  }

}
