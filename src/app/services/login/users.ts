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

export const users: UserInfo[] = [
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
