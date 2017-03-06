import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { environment } from '../../../environments/environment';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

export const tokenName = 'x-subject-token';
const tokenInfoName = 'token-info';

export class Address {
  country_id: number;
  region_id: number;
  location_id: number;
  postcode: string;
  street: string;
  typeAddress: number;
}

export class UserInfo {
  usr: string;

  name: string;
  familyName: string;

  birthDate: string;
  gender: number;
  email: string;

  addresses: Array<Address>;
}

const user1 = 'karen.najera';
const user2 = 'blanca.vazquez';
const user3 = 'hugo.estrada';

const users: UserInfo[] = [
  {
    'usr': user1,
    'name': 'Karen',
    'familyName': 'Najera',
    'birthDate': '1990-01-01',
    'gender': 2,
    'email': 'karen.najera@infotec.mx',
    'addresses': [
      {
        'country_id': 1,
        'region_id': 1,
        'location_id': 1,
        'postcode': '12345',
        'street': 'Insurgentes 223',
        'typeAddress': 1
      }
    ]
  },
  {
    'usr': user2,
    'name': 'Blanca',
    'familyName': 'Vazquez',
    'birthDate': '1990-01-01',
    'gender': 2,
    'email': 'blanca.vazquez@infotec.mx',
    'addresses': [
      {
        'country_id': 1,
        'region_id': 1,
        'location_id': 2,
        'postcode': '12345',
        'street': 'Tlalpan 101',
        'typeAddress': 1
      }
    ]
  },
  {
    'usr': user3,
    'name': 'Hugo',
    'familyName': 'Estrada Esquivel',
    'birthDate': '1971-04-14',
    'gender': 1,
    'email': 'hugo.estrada@infotec.mx',
    'addresses': [
      {
        'country_id': 1,
        'region_id': 1,
        'location_id': 3,
        'postcode': '14050',
        'street': 'San Fernando 37',
        'typeAddress': 2
      }
    ]
  }
];

      return body;
    })
    .catch((error: Response | any) => {
       console.log('Error at login');
       console.log(error);
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
      } else if (usr == user3) {
        return users[2];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
