import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../../../../../core/services/login/login.service';
import { UserInfo } from '../../../../../../core/services/login/users';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  userInfo: UserInfo;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.userInfo = this.loginService.getUserInfo();
  }

}
