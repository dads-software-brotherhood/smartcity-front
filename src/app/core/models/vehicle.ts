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
  fuelConsumption: number;
  vehiclPlateIdentifier?: string;
  dateModified?: Date;
  datecreated?: Date;
  vehicleTypeId?: string;
  
  constructor(index?: string, name?: string, description?: string, vehicleType?: VehicleType,
              brandName?: string, modelName?: string, vehicleModelDate?: Date, fuelType?: FuelType,
              fuelConsumption?: number, vehiclPlateIdentifier?: string, dateModified?: Date, 
              dateCreated?: Date, vehicleTypeId?: string) {
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
    this.dateModified = dateModified;
    this.datecreated = dateCreated;
    this.vehicleTypeId = vehicleTypeId;
  }
}
