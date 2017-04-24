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

  showDialog: boolean;
  showErrorDialog: boolean;
  messageModal: string;

  constructor(private userProfileService: UserProfileService, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  cancelAccount() {
    if (this.loginService.isSA() || this.loginService.getLoggedUser().username === 'idm') {
      this.showErrorMessage('Can\'t delete a SA account');
    } else {
      this.userProfileService.cancelAccount().subscribe(
        (res) => {
          this.showMessage('Your account has been successfully deleted');
        },
        (error) => {
          console.error(error);
          this.showErrorMessage('Can\'t cancel the account, try again later');
        }
      );
    }
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
