import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../../../services/login/login.service';
import { UserInfo } from '../../../../services/login/users';

@Component({
  selector: 'app-home-smart-cities',
  templateUrl: './home-smart-cities.component.html',
  styleUrls: ['./home-smart-cities.component.sass']
})
export class HomeSmartCitiesComponent implements OnInit {

  userInfo: UserInfo;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.userInfo = this.loginService.getUserInfo();
  }

}
