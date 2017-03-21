import { VehicleType } from './vehicle-type';
import { FuelType } from './fuel-type';

export class Vehicle {

  name: string;
  description?: string;
  vehicleType: VehicleType;
  brandName: string;
  modelName: string;
  vehicleModelDate: Date;
  fuelType: FuelType;
  fuelConsumption: number;
  vehiclPlateIdentifier?: string;
  dateModified?: Date;
  datecreated?: Date;

}
