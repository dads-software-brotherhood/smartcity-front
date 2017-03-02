import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export const tokenName = 'x-subject-token';
const tokenInfoName = 'token-info';

export class UserInfo {
  name: string;
  email: string;
  url: string;
  usr: string;
}

const user1 = 'karen.najera';
const user2 = 'blanca.vazquez';

const users: UserInfo[] = [
  {'name': 'Karen Najera', 'email': 'blanca.vazquez@infotec.mx', 'url': 'http://', 'usr':user1 },
  {'name': 'Blanca Vazquez', 'email': 'blanca.vazquez@infotec.mx', 'url': 'http://', 'usr':user2 }
];

@Injectable()
export class LoginService {

  constructor(private http: Http) {
  }

  login(email: string, password: string): boolean {
    let emailFixed: string = null;
    if (email) {
      emailFixed = email.toLowerCase();
    }

    if ((emailFixed == user1 && email == user1) || (emailFixed == user2 && email == user2)) {
      localStorage.setItem(tokenName, email);
      localStorage.setItem(tokenInfoName, email);
      return true;
    } else {
      this.logout();
      return false;
    }
  }

  logout() {
    localStorage.removeItem(tokenName);
    localStorage.removeItem(tokenInfoName);

    // TODO: Eliminar el token del servidor IDM
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(tokenName);
  }

  getUserInfo(): UserInfo {
    const usr = localStorage.getItem(tokenInfoName);

    if (usr) {
      if (usr == user1) {
        return users[0];
      } else if (usr == user2) {
        return users[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
