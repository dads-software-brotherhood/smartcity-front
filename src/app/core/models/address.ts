import { AddressType } from './address-type';
import { Locality } from './locality';

export class Address {

  index?: number;
  street: string;
  postalCode?: string;
  addressType?: AddressType;
  locality: Locality;
}
