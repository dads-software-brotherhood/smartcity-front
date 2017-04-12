export class VehicleTypesModel {

  id: string;
  name: string;
  datecreated?: Date;
  dateModified?: Date;
  
  constructor(id?: string, name?: string, dateCreated?: Date, dateModified?: Date) {
    this.id = id;
    this.name = name;
    this.datecreated = dateCreated;
    this.dateModified = dateModified;
  }
}
