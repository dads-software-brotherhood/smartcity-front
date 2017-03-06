import { Component, OnInit } from '@angular/core';

import { LoginService, UserInfo } from '../../../../services/login/login.service';

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
