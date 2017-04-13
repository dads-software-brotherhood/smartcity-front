import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehicleType } from '../../../../../../core/models/vehicle-type';
import { FuelType } from '../../../../../../core/models/fuel-type';
import { Vehicle } from '../../../../../../core/models/vehicle';
import { EnumEx } from '../../../../../../core/models/EnumEx';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { VehicleService } from '../../../../../../core/services/vehicle/vehicle.service';
import { VehicleTypeService } from '../../../../../../core/services/vehicle-type/vehicle-type.service';
import { CustomValidators } from 'ng2-validation';

@Component({
  templateUrl: './user-vehicle-detail.component.html',
  styleUrls: ['./user-vehicle-detail.component.sass']
})

export class UserVehicleDetailComponent implements OnInit {
  public vehicleForm: FormGroup;
  public index: string;
  public title: string;
  private vehicleTypes: VehicleType[];
  private fuelTypes: any[];
  private vehicles: Vehicle[] = [];
  private vehiclesCharge: Vehicle[] = [];
  private errorMessage: string;
  private successMessage : string;
  private vehicle = new Vehicle();

  showDialog: boolean;
  isConfirm: boolean;
  messageModal: string;
  includeText: boolean;
  valido: boolean = false;
  vehicleTypeId: string = "";

  constructor(private fb: FormBuilder,   
              private router: Router,
              private route: ActivatedRoute,
              private _service: VehicleService,
              private _serviceVehicleType: VehicleTypeService) { 
    try
    {
        this.prepareForm();
    }
    catch(e){ this.errorMessage="Error occurred while loading vehicle data"} 
   } 

  private sub: any;
   
  private prepareForm(){
    this.vehicleForm = this.fb.group({ //// Make Model driven form
            "name": this.buildRequiredFormControl(this.vehicle.name),
            "brandName": this.buildSimpleFormControl(this.vehicle.brandName),
            "modelName": this.buildSimpleFormControl(this.vehicle.modelName),
            "description": this.buildSimpleFormControl(this.vehicle.description),
            "vehiclPlateIdentifier": this.buildSimpleFormControl(this.vehicle.vehiclPlateIdentifier),
            "vehicleType": this.buildRequiredFormControl(this.vehicleTypeId),
            "fuelType": this.buildRequiredFormControl(this.vehicle.fuelType),
            "fuelConsumption": this.buildSimpleFormControl(this.vehicle.fuelConsumption)
        }) 
  }

  private buildRequiredFormControl(value?: any): FormControl {
    return new FormControl(value, Validators.required);
  }

  private buildSimpleFormControl(value?: any): FormControl {
    return new FormControl(value, []);
  }

  ngOnInit() {
        try
        {
            this.isConfirm = false;
            this.includeText = false;
            this.messageModal = "";
            this.fuelTypes = this.getFuelTypes();
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
                this.getVehicleTypes();
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
        var intervalo = setInterval(() =>  
        this._serviceVehicleType.getAll().subscribe(
        vehicleType => { this.vehicleTypes = vehicleType;
            if(this.vehicle.vehicleType != undefined)
            {
                clearInterval(intervalo);
                if(this.index != "")
                {
                    for(let i=0; i<vehicleType.length; i++)
                    {
                        if(this.vehicle.vehicleType.id == vehicleType[i].id)
                            this.vehicleTypeId = vehicleType[i].id;
                    }
                    this.prepareForm();
                }
            }
        },
        error => this.errorMessage = <any>error
        ),100);
      }
      catch(e){ throw e;}
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

bindTable() {
    try
    {
    this._service.getAll().subscribe(
      vehicles => { this.vehicles = vehicles;
      }, error => this.errorMessage = <any>error);
    }
    catch(e){throw e;}
  }

private findVehicleType(id): VehicleType {
    for (let i = 0; i < this.vehicleTypes.length; i++) {
      if (this.vehicleTypes[i].id === id) {
        return this.vehicleTypes[i];
      }
    }
}

save(form, isValid: boolean) {
    this.errorMessage = null;
    this.successMessage = null;
    var isRepeat = false;
    var vehicleName;
    var vehicleNameNew;

    try
    {
    if(isValid)
    {
        vehicleName = this.vehicle.name.toUpperCase().trim();
        this.vehicle.vehicleType = this.findVehicleType(form.vehicleType);

        if(this.vehicle.vehicleType.includeBrandModel)
        {
            if(this.vehicle.brandName != "" && this.vehicle.modelName != "" && this.vehicle.brandName != undefined
               && this.vehicle.modelName != undefined)
                this.valido = true;
        }
        else
            this.valido = true;
        
        if(this.index == "")
        {
            this.vehicles.forEach(function(item){
                if(vehicleName == item.name.toUpperCase().trim())
                {
                    this.valido = false;
                    isRepeat = true;
                }
            });
        }
        else
        {
            vehicleName = this.vehicles[this.index].name.toUpperCase().trim();
            if(vehicleName != this.vehicle.name.toUpperCase().trim())
            {
                vehicleNameNew = this.vehicle.name.toUpperCase().trim();
                for(let i=0; i<this.vehicles.length; i++)
                {
                    if(vehicleNameNew == this.vehicles[i].name.toUpperCase().trim())
                    {
                        this.valido = false;
                        isRepeat = true;
                    }
                }
            }
        }
       
        if(this.valido)
        {
            form.vehicleType = this.vehicle.vehicleType;
            
            if(this.index == "")
            {
                
                this._service.insert(this.vehicle).then(form => this.vehicles.push(form),
                error =>  this.errorMessage = <any>error);
                this.messageModal = "Your record is successfully registered!";
                this.showDialog = true;

            }
            else
            {
                this._service.update(form, this.index).then(res => true,
                error =>  this.errorMessage = <any>error);
                this.messageModal = "Your record is successfully modified!";
                this.showDialog = true;
            }
 
        }
        else if(!this.valido && isRepeat)
        {
            this.messageModal = "There is already a vehicle with that name registered";
            this.showDialog = true;
            this.getVehicleTypes();
        }
        else if(!this.valido && !isRepeat)
        {
            this.messageModal = "For this type of vehicle, Brand Name and Model Name are required";
            this.showDialog = true;
            this.getVehicleTypes();
        }
    }
}
catch(e)
{ this.errorMessage = "Error occurred while saving vehicle data"; }
}

onConfirm(){
    if(this.valido)
    this.router.navigate(["/smart-cities/user-vehicle/vehicles"]);
    else
    this.showDialog = false;
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
