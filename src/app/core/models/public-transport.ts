import { PublicTransportFuelType } from './public-transport-fuel-type';
import { TransportSchedule } from './transport-schedule';

export class PublicTransport {
  id: string;
  name: string;
  description?: string;
  brandName: string;
  modelName: string;
  passengersTotal?: number;
  fuelType: PublicTransportFuelType;
  fuelConsumption?: string;
  height?: number;
  width?: number;
  depth?: number;
  weight?: number;
  dateModified?: Date;
  dateCreated: Date;
  transportSchedules?: Array<TransportSchedule>;
  creatorId: string;
}
