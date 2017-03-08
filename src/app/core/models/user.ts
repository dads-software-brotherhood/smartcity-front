import { Address } from './address';

export class User {
  usr: string;

  name: string;
  familyName: string;

  birthDate: string;
  gender: number;
  email: string;

  addresses: Array<Address>;
}
