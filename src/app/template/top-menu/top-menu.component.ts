import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.sass']
})
export class TopMenuComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {

  }

  logout() {
    this.loginService.logout();
  }

}
