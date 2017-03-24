import { AddressType } from './address-type';

export class Address {

  index?: number;
  countryId: number;
  regionId: number;
  localityId: number;
  addressCountry: string;
  addressRegion: string;
  addressLocality?: string;
  street: string;
  postalCode?: string;
  addressType?: AddressType;

}
