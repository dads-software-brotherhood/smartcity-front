import { Component, OnInit } from '@angular/core';
import { VehicleType } from '../../../../core/models/vehicle-type';
import { Vehicle } from '../../../../core/models/vehicle';
import { EnumEx } from '../../../../core/models/EnumEx';

@Component({
  templateUrl: './user-vehicle-detail.component.html',
  styleUrls: ['./user-vehicle.component.sass']
})
export class UserVehicleDetailComponent implements OnInit {
  public id: string;
  public title: string;
  private vehicleTypes: any[];
  private sub: any;

  constructor() { 
      this.vehicleTypes = this.getVehicleTypes();
  }
   
  ngOnInit() {
        if (this.id != "") { //// Based on id decide Title add/edit
            this.title = "Edit User Vehicle"
        } else {
            this.title = "Add User Vehicle"
        }

        if (!this.id) {
            return;
        }
  }

  public getVehicleTypes() {
    let vehicleTypes: any[] = [];

    //Get name-value pairs from VehicleTypeEnum
    let vehicleTypeEnumList = EnumEx.getNamesAndValues(VehicleType);

    console.log(vehicleTypeEnumList);

    //Convert name-value pairs to VehicleType[]
    vehicleTypeEnumList.forEach(pair => {
        let vehicleType = { 'id': pair.value.toString(), 'name': pair.name };
        vehicleTypes.push(vehicleType);
        console.log(vehicleType);
    });
    console.log(vehicleTypes);
    return vehicleTypes;
}

  //Change Selected vehicle type callback
   private changeVehicleType(event: any) {
    }


}
