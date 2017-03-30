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
  errorMessage: string;

  private vehicle = new Vehicle();

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
            "vehicleType": [null, Validators.required],
            "fuelType": [null, Validators.required],
            "fuelConsumption": [null],
            "manufacturerName": [null],
            "cargoVolume": [null],
            "height": [null],
            "width": [null],
            "depth": [null],
            "weight": [null]
        })
      
      
  }

    private sub: any;
   
  ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.index = params["id"];
        })
        if (this.index != "") { //// Based on id decide Title add/edit
            this.title = "Edit User Vehicle"
            this.getVehicleData();
        } else {
            this.title = "Add User Vehicle"
        }

  }

  getVehicleData() { 
    this._service.getAll().subscribe(
      vehicles => { this.vehicles = vehicles;
      this.vehicle = this.vehicles[this.index];
  },
      error => this.errorMessage = <any>error
    );
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


  getVehicleTypes() {
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

 getFuelTypes() {
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
          console.log(this.index);
          if(this.index == "")
            {
           this._service.insert(form)
                .then(form => this.vehicles.push(form),
                    error =>  this.errorMessage = <any>error);
            }
            else
            {
                this._service.update(form, this.index).then(res => true,
                error =>  this.errorMessage = <any>error);
            }
                
        this.router.navigate(["/smart-cities/user-vehicle/vehicles"]);
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////77777
//     fileChange(input){
//         this.readFiles(input.files);
//     }

//     readFile(file, reader, callback){
//             reader.onload = () => {
//             callback(reader.result);
//         }
//         reader.readAsDataURL(file);
//     }

//     readFiles(files){
//   // Create the file reader
//   let reader = new FileReader();
//     // Start reading this file
//     this.readFile(files[0], reader, (result) =>{
//       // Create an img element and add the image file data to it
//       var img = document.createElement("img");
//       img.src = result;
//       this.resize(img, 250, 250, (resized_jpeg, before, after)=>{
//         // Add the resized jpeg img source to a list for preview
//         // This is also the file you want to upload. (either as a
//         // base64 string or img.src = resized_jpeg if you prefer a file).
//         console.log(resized_jpeg); 
//         this.vehicle.base64 = resized_jpeg;
//       });
//     });
//     files = null;
// }

// resize(img, MAX_WIDTH:number, MAX_HEIGHT:number, callback){
//   // This will wait until the img is loaded before calling this function
//   return img.onload = () => {

//     // Get the images current width and height
//     var width = img.width;
//     var height = img.height;

//     // Set the WxH to fit the Max values (but maintain proportions)
//     if (width > height) {
//         if (width > MAX_WIDTH) {
//             height *= MAX_WIDTH / width;
//             width = MAX_WIDTH;
//         }
//     } else {
//         if (height > MAX_HEIGHT) {
//             width *= MAX_HEIGHT / height;
//             height = MAX_HEIGHT;
//         }
//     }

//     // create a canvas object
//     var canvas = document.createElement("canvas");

//     // Set the canvas to the new calculated dimensions
//     canvas.width = width;
//     canvas.height = height;
//     var ctx = canvas.getContext("2d");  

//     ctx.drawImage(img, 0, 0,  width, height); 

//     // Get this encoded as a jpeg
//     // IMPORTANT: 'jpeg' NOT 'jpg'
//     var dataUrl = canvas.toDataURL('image/jpeg');

//     // callback with the results
//     callback(dataUrl, img.src.length, dataUrl.length);
//   };
// }


}
