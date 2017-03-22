import { Address } from './address';
import { HealthProfile } from './health-profile';
import { Vehicle } from './vehicle';
import { Gender } from './gender';

export class UserProfile {

  id: string;
  email: string;
  name: string;
  familyName: string;
  birthDate?: Date;
  gender: Gender;

  group?: string;
  idOrion?: string;
  registerType?: string;
  registerDate?: Date;
  lastEntry?: Date;
  lastProfileUpdate?: Date;

  healthProfiles?: Array<HealthProfile>;
  addresses?: Array<Address>;
  vehicles?: Array<Vehicle>;

}
