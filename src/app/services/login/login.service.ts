import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

//import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

class Role {
  id: string;
  name: string;
}

class Domain {
  id: string;
  name: string;
}

class User {
  id: string;
  name: string;
  domain: Domain;
}

class UserToken {
  user : User;
  auditIds: string;
  issuedAt: string;
  expiresAt: string;
  roles: Array<Role>;
}

@Injectable()
export class LoginService {

  private loggedIn : boolean = false;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(email: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let query = {
      "auth": {
        "identity": {
          "methods": ["password"],
          "password": {
            "user": {
              "name": email,
              "domain": { "id": "default" },
              "password": password
            }
          }
        }
      }
    };


    return this.http
      .post(
        'http://192.168.56.11/v3/token',
        JSON.stringify(query),
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      })
      .catch(this.handleError);
  }

  private handleError (error: Response | any) {
    console.log('Error at connect');
    return null;
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
