import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehicleType } from '../../../../../../core/models/vehicle-type';
import { FuelType } from '../../../../../../core/models/fuel-type';
import { Vehicle } from '../../../../../../core/models/vehicle';
import { EnumEx } from '../../../../../../core/models/EnumEx';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { VehicleService } from '../../../../../../core/services/vehicle/vehicle.service';

@Component({
  templateUrl: './user-vehicle-detail.component.html',
  styleUrls: ['./user-vehicle-detail.component.sass']
})

export class UserVehicleDetailComponent implements OnInit {
  public vehicleForm: FormGroup;
  public index: string;
  public title: string;
  private vehicleTypes: any[];
  private fuelTypes: any[];
  private vehicles: Vehicle[] = [];
  private vehiclesCharge: Vehicle[] = [];
  private errorMessage: string;
  private successMessage : string;
  private vehicle = new Vehicle();

  constructor(private fb: FormBuilder,   
              private router: Router,
              private route: ActivatedRoute,
              private _service: VehicleService) { 
    try
    {
    this.vehicleTypes = this.getVehicleTypes();
    this.fuelTypes = this.getFuelTypes();
    this.vehicleForm = fb.group({ //// Make Model driven form
            "name": [null, Validators.required],
            "brandName": [null],
            "modelName": [null],
            "description": [null],
            "vehiclPlateIdentifier": [null],
            "vehicleType": [null, Validators.required],
            "fuelType": [null, Validators.required],
            "fuelConsumption": [null]
        }) 
    }
    catch(e){ this.errorMessage="Error occurred while loading vehicle data"} 
   } 

   private sub: any;
   
  ngOnInit() {
        try
        {
            this.bindTable();
            this.sub = this.route.params.subscribe(params => {
                this.index = params["id"];
            })
            if (this.index != "") { //// Based on id decide Title add/edit
                this.title = "Edit User Vehicle"
                this.getVehicleData();
            } 
            else {
                this.title = "Add User Vehicle"
            }
        }
        catch(e){ this.errorMessage = "Error occurred while loading vehicle data"}
  }

  getVehicleData() { 
      try
      {
        this._service.getAll().subscribe(
        vehicles => { this.vehiclesCharge = vehicles;
            this.vehicle = this.vehiclesCharge[this.index];
        },
        error => this.errorMessage = <any>error
        );
      }
      catch(e){ throw e;}
  }

  getVehicleTypes() {
    try
    {
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
    catch(e){throw e;}
}

 getFuelTypes() {
    try
    {
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
    catch(e){throw e;}
}

onVehicleTypeChange(event)
{
    try
    {
    var divBrandName = document.getElementById("divBrandName");
    var divModelName = document.getElementById("divModelName");
    var inputBrandName = document.getElementById("brandName");
    var inputModelName = document.getElementById("modelName");

    if(divBrandName != null && divModelName != null)
    {
        if(event.target.value.indexOf('CAR') > -1 || event.target.value.indexOf('MOTORCYCLE') > -1)
        {
            if((<HTMLInputElement>inputBrandName).value != "")
                divBrandName.setAttribute("style", "display: none;");
            else
                divBrandName.setAttribute("style", "display: block;");

            if((<HTMLInputElement>inputModelName).value != "")
                divModelName.setAttribute("style", "display: none;");
            else
                divModelName.setAttribute("style", "display: block;");
        }
        else
        {
            divBrandName.setAttribute("style", "display: none;");
            divModelName.setAttribute("style", "display: none;");
        }
    }
    }
    catch(e) {this.errorMessage="An error occurred while checking the type of vehicle"; }
}

onKeyUpBrandName(event)
{
    try
    {
    var divBrandName = document.getElementById("divBrandName");
    var selectVehicleType = document.getElementById("vehicleType");
    var selectValue = (<HTMLSelectElement>selectVehicleType).value;

    if(divBrandName != null)
    {
        if(event.target.value != "")
            divBrandName.setAttribute("style", "display: none;");
        else
        {
            if(selectValue.indexOf('CAR') > -1 || selectValue.indexOf('MOTORCYCLE') > -1)
                divBrandName.setAttribute("style", "display: block;");
            else
                divBrandName.setAttribute("style", "display: none;");
        }
    }
    }
    catch(e){this.errorMessage="An error occurred while writing the vehicle's brand"}
}

onKeyUpModelName(event)
{
    try
    {
    var divModelName = document.getElementById("divModelName");
    var selectVehicleType = document.getElementById("vehicleType");
    var selectValue = (<HTMLSelectElement>selectVehicleType).value;

    if(divModelName != null)
    {
        if(event.target.value != "")
            divModelName.setAttribute("style", "display: none;");
        else
        {
            if(selectValue.indexOf('CAR') > -1 || selectValue.indexOf('MOTORCYCLE') > -1)
                divModelName.setAttribute("style", "display: block;");
            else
                divModelName.setAttribute("style", "display: none;");
        }
    }
    }
    catch(e){this.errorMessage="An error occurred while writing the vehicle's model"}
}

bindTable() {
    try
    {
    this._service.getAll().subscribe(
      vehicles => { this.vehicles = vehicles;
      }, error => this.errorMessage = <any>error);
    }
    catch(e){throw e;}
  }

save(form, isValid: boolean) {
    this.errorMessage = null;
    this.successMessage = null;
    var valido = false;
    var isRepeat = false;
    var vehicleName;
    var btn = document.getElementById("btnSave");

    try
    {
    if(isValid)
    {
        vehicleName = this.vehicle.name.toUpperCase().trim();

        if(this.vehicle.vehicleType.toString() == "CAR" || this.vehicle.vehicleType.toString() == "MOTORCYCLE")
        {
            if(this.vehicle.brandName != "" && this.vehicle.modelName != "" && this.vehicle.brandName != undefined
               && this.vehicle.modelName != undefined)
                valido = true;
        }
        else
            valido = true;
        
        if(this.index == "")
        {
            this.vehicles.forEach(function(item){
                if(vehicleName == item.name.toUpperCase().trim())
                {
                    valido = false;
                    isRepeat = true;
                }
            });
        }
        else
        {
            vehicleName = this.vehicles[this.index].name.toUpperCase().trim();
            if(vehicleName != this.vehicle.name.toUpperCase().trim())
            {
                this.vehicles.forEach(function(item){
                if(vehicleName == item.name.toUpperCase().trim())
                {
                    valido = false;
                    isRepeat = true;
                }
            });
            }
        }
       
        if(valido)
        {
            if(this.index == "")
            {
                this._service.insert(form).then(form => this.vehicles.push(form),
                error =>  this.errorMessage = <any>error);
            }
            else
            {
                this._service.update(form, this.index).then(res => true,
                error =>  this.errorMessage = <any>error);
            }
            this.successMessage = "Your record is successfully registered!!";  

            if(btn != null)
            {
                (<HTMLButtonElement>btn).disabled = true;
            }  
            // // this.router.navigate(["/smart-cities/user-vehicle/vehicles"]);
        }
        else if(!valido && isRepeat)
        {
            this.errorMessage = "There is already a vehicle with that name registered";
        }
    }
}
catch(e)
{ this.errorMessage = "Error occurred while saving vehicle data"; }
}

restrictNumeric(e, object){
    var input;
    if (e.metaKey || e.ctrlKey) {
        return true;
    }
    if (e.which === 32) {
        return false;
    }
    if (e.which === 0) {
        return true;
    }
    if (e.which < 33) {
        return true;
    }
    if (e.which === 46) {
        if(object.value != undefined && object.value != '')
        {
        if(object.value.indexOf('.') > 0)
            return false;
        else
            return true;
    }
    else
    return false;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

}
