export class VehicleType {

  id: number;
  name: string;
  includeBrandModel: boolean;
  dateCreated?: Date;
  dateModified?: Date;
  constructor(id?: number, name?: string, includeBrandModel?: boolean, dateCreated?: Date, dateModified?: Date) {
    this.id = id;
    this.name = name;
    this.includeBrandModel = includeBrandModel;
    this.dateCreated = dateCreated;
    this.dateModified = dateModified;
  }
}
