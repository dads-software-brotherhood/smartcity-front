import { AddressType } from './address-type';
import { Locality } from './locality';

export class Address {

  index?: string;
  street: string;
  postalCode?: string;
  addressType?: AddressType;
  locality: Locality;
}
