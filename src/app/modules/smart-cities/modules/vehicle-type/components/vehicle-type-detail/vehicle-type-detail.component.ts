import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { VehicleType } from '../../../../../../core/models/vehicle-type';
import { VehicleTypeService } from '../../../../../../core/services/vehicle-type/vehicle-type.service';

@Component({
  selector: 'vehicle-type-detail',
  templateUrl: './vehicle-type-detail.component.html',
  styleUrls: ['./vehicle-type-detail.component.sass'],

})
export class VehicleTypeDetailComponent implements OnInit {
  public vehicleTypeForm: FormGroup;
  title: string;
  errorMessage: string;
  vehicleTypes: VehicleType[] = [];
  vehicleType = new VehicleType();
  sum: number = 0; //variable que se utiliza para contabilizar el total de columnas que tiene la tabla
                   //para utilizar en las busquedas.
  
  //Variables utilizadas para mostrar la ventana modal, isConfirm=true (Muestra 2 botones Aceptar, Cancelar),
  //isConfirm=false (Muestra solo un botón Aceptar), messageModal (Mensaje que muestra la ventana Modal),
  //includeText (Se utiliza para mostrar un textArea o no)
  showDialog: boolean;
  isConfirm: boolean;
  messageModal: string;
  includeText: boolean;
  id: number = 0;
  valido: boolean = true;

  constructor(private fb: FormBuilder,   
              private router: Router,
              private route: ActivatedRoute,
              private _serviceVehicleType: VehicleTypeService) { 
    try
    {
        this.prepareForm();
    }
    catch(e){   this.messageModal = "Error occurred while loading vehicle-type data";
                    this.showDialog = true; } 
   } 

  private sub: any;
   
  private prepareForm(){
    this.vehicleTypeForm = this.fb.group({ //// Make Model driven form
            "name": this.buildRequiredFormControl(this.vehicleType.name),
            "includeBrandModel": this.buildSimpleFormControl(this.vehicleType.includeBrandModel)
        }) 
  }

  private buildRequiredFormControl(value?: any): FormControl {
    return new FormControl(value, Validators.required);
  }

  private buildSimpleFormControl(value?: any): FormControl {
    return new FormControl(value, []);
  }

  ngOnInit(){
      try
        {
            this.isConfirm = false;
            this.includeText = false;
            this.messageModal = "";
            this.sub = this.route.params.subscribe(params => {
                if(params["id"] == "")
                    this.id = 0;
                else
                    this.id = Number(params["id"]);
            })
            if (this.id > 0) { //// Based on id decide Title add/edit
                this.title = "Edit User Vehicle";
                this.getVehicleTypeData();
            } 
            else {
                this.title = "Add User Vehicle";
            }
        }
        catch(e){ this.messageModal = "An error ocurred while loading record";
                    this.showDialog = true;
                    this.valido = false;}
  }

  getVehicleTypeData() { 
      try
      { 
        this._serviceVehicleType.getAll().subscribe(
        vehicleTypes => { this.vehicleTypes = vehicleTypes;
            this.vehicleType = this.vehicleTypes.find(val => val.id == this.id);
        },
        error => this.errorMessage = <any>error
        );

      }
      catch(e){ throw e; }
  }

  save(form, isValid: boolean) {
    this.errorMessage = null;

    try
    {
    if(isValid)
    {
        if(this.id == 0)
        { 
             if(form.includeBrandModel == undefined)
                form.includeBrandModel = false;
                
             this._serviceVehicleType.insert(form).subscribe(
             (res) => {
                        this.messageModal = "Your record is successfully registered!";
                        this.showDialog = true;
                        this.valido = true;
            },
            (error) => {
                if(error.status == 500)
                {
                    this.messageModal = "The vehicle type already exist!";
                    this.showDialog = true;
                }
                else
                {
                    this.messageModal = "An error ocurred while saving the record";
                    this.showDialog = true;
                }
                this.valido = false;
            }
            );
        }
        else
        {
            this._serviceVehicleType.update(form, this.id).subscribe(
             (res) => {
                        this.messageModal = "Your record is successfully modified!";
                        this.showDialog = true;
                        this.valido = true;
            },
            (error) => {
                if(error.status == 500)
                {
                    this.messageModal = "The vehicle type already exist!";
                    this.showDialog = true;
                }
                else
                {
                    this.messageModal = "An error ocurred while saving the record";
                    this.showDialog = true;
                }
                this.valido = false;
            }
            );   
        }
 
    }
}
catch(e)
{ }
}

onConfirm(){
    if(this.valido)
    this.router.navigate(["/smart-cities/vehicle-type/vehicleType"]);
    else
    this.showDialog = false;
}

  
}
