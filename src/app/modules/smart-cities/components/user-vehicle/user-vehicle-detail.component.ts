import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehicleType } from '../../../../core/models/vehicle-type';
import { FuelType } from '../../../../core/models/fuel-type';
import { Vehicle } from '../../../../core/models/vehicle';
import { EnumEx } from '../../../../core/models/EnumEx';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

import { VehicleService } from '../../../../core/services/vehicle/vehicle.service';

@Component({
  templateUrl: './user-vehicle-detail.component.html',
  styleUrls: ['./user-vehicle.component.sass']
})
export class UserVehicleDetailComponent implements OnInit {
  public vehicleForm: FormGroup;
  public submitted: boolean;
  public events: any[] = [];
  public index: string;
  public title: string;
  private vehicleTypes: any[];
  private fuelTypes: any[];
  vehicles: Vehicle[] = [];
  errorMessage: string;

  vehicle = new Vehicle();
  private valueVehicleType: VehicleType;
  private valueFuelType: FuelType;

  constructor(private fb: FormBuilder,   
              private router: Router,
              private route: ActivatedRoute,
              private _service: VehicleService) { 

       this.vehicleTypes = this.getVehicleTypes();
       this.fuelTypes = this.getFuelTypes();
      this.vehicleForm = fb.group({ //// Make Model driven form
            "name": [null, Validators.required],
            "brandName": [null, Validators.required],
            "modelName": [null, Validators.required],
            "description": [null],
            "vehiclPlateIdentifier": [null],
            "vehicleType": [null],
            "fuelType": [null]
        })
      
      
  }

    private sub: any;
   
  ngOnInit() {
        // this.sub = this.route.params.subscribe(params => {
        //     this.index = params["index"];
        // })

        if (this.index != undefined) { //// Based on id decide Title add/edit
            this.title = "Edit User Vehicle"
        } else {
            this.title = "Add User Vehicle"
        }

        if (!this.index) {
            return;
        }
         
  }

  public getVehicleTypes() {
    let vehicleTypes: any[] = [];

    //Get name-value pairs from VehicleTypeEnum
    let vehicleTypeEnumList = EnumEx.getNamesAndValues(VehicleType);

    //Convert name-value pairs to VehicleType[]
    vehicleTypeEnumList.forEach(pair => {
        let vehicleType = { 'id': pair.value.toString(), 'name': pair.name };
        vehicleTypes.push(vehicleType);
    });
    return vehicleTypes;
}

 public getFuelTypes() {
    let fuelTypes: any[] = [];

    //Get name-value pairs from VehicleTypeEnum
    let fuelTypeEnumList = EnumEx.getNamesAndValues(FuelType);

    //Convert name-value pairs to VehicleType[]
    fuelTypeEnumList.forEach(pair => {
        let fuelType = { 'id': pair.value.toString(), 'name': pair.name };
        fuelTypes.push(fuelType);
    });
    return fuelTypes;
}

save(form, isValid: boolean) {
           console.log(form);
           this._service.insert(form)
                .then(form => this.vehicles.push(form),
                    error =>  this.errorMessage = <any>error);

                
        this.router.navigate(["/smart-cities/vehicles"]);
    }

}
