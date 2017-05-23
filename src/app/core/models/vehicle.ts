import { VehicleType } from './vehicle-type';
import { FuelType } from './fuel-type';

export class Vehicle {

  index: string;
  name: string;
  description?: string;
  vehicleType: VehicleType;
  brandName: string;
  modelName: string;
  vehicleModelDate: Date;
  fuelType: FuelType;
  fuelConsumption?: number;
  vehiclPlateIdentifier?: string;
  type: string;
  favorite?: boolean;
  dateModified?: Date;
  datecreated?: Date;

  constructor(index?: string, name?: string, description?: string, vehicleType?: VehicleType,
              brandName?: string, modelName?: string, vehicleModelDate?: Date, fuelType?: FuelType,
              fuelConsumption?: number, vehiclPlateIdentifier?: string, type?: string,
              favorite?: boolean, dateModified?: Date, dateCreated?: Date) {
    this.index = index;
    this.name = name;
    this.description = description;
    this.vehicleType = vehicleType;
    this.brandName = brandName;
    this.modelName = modelName;
    this.vehicleModelDate = vehicleModelDate;
    this.fuelType = fuelType;
    this.fuelConsumption = fuelConsumption;
    this.vehiclPlateIdentifier = vehiclPlateIdentifier;
    this.type = type;
    this.favorite = favorite;
    this.dateModified = dateModified;
    this.datecreated = dateCreated;
  }
}
