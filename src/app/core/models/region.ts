import { Country } from './country';

export class Region {
  id: number;
  name: string;
  regionCode?: string;
  country: Country;
}
