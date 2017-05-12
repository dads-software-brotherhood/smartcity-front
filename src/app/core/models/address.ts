import { AddressType } from './address-type';
import { Locality } from './locality';

export class Address {

  index?: string;
  street: string;
  postalCode?: string;
  favorite?: boolean;
  addressType?: AddressType;
  locality: Locality;
}
