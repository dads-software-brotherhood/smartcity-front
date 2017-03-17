import { AddressType } from './address-type';

export class Address {

  countryId: number;
  regionId: number;
  localityId: number;
  addreddCountry: string;
  addreddRegion: string;
  addreddLocality?: string;
  street: string;
  postalCode?: string;
  addressType?: AddressType;

}
