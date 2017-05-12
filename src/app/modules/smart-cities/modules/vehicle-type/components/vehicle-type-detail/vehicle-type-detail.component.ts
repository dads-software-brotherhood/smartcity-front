import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { VehicleType } from '../../../../../../core/models/vehicle-type';
import { VehicleTypeService } from '../../../../../../core/services/vehicle-type/vehicle-type.service';
import { LoginService } from '../../../../../../core/services/login/login.service';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'vehicle-type-detail',
    templateUrl: './vehicle-type-detail.component.html',
    styleUrls: ['./vehicle-type-detail.component.sass'],

})

export class VehicleTypeDetailComponent implements OnInit {
    public vehicleTypeForm: FormGroup;
    private title: string;
    private vehicleTypes: VehicleType[] = [];
    private vehicleType = new VehicleType();
    // tslint:disable-next-line:no-inferrable-types
    private sum: number = 0; // variable que se utiliza para contabilizar el total de columnas que tiene la tabla
    // para utilizar en las busquedas.

    // Variables utilizadas para mostrar la ventana modal, isConfirm=true (Muestra 2 botones Aceptar, Cancelar),
    // isConfirm=false (Muestra solo un botón Aceptar), messageModal (Mensaje que muestra la ventana Modal),
    // includeText (Se utiliza para mostrar un textArea o no)
    private showDialog: boolean;
    private isConfirm: boolean;
    private messageModal: string;
    private includeText: boolean;
    // tslint:disable-next-line:no-inferrable-types
    private id: number = 0;
    // tslint:disable-next-line:no-inferrable-types
    private valido: boolean = true;

    constructor(private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _serviceVehicleType: VehicleTypeService,
        private _loginService: LoginService) {
        try {
            this.prepareForm();
        } catch (e) {
            this.messageModal = 'Error occurred while loading vehicle-type data';
            this.showDialog = true;
        }
    }

    // tslint:disable-next-line:member-ordering
    private sub: any;

    private prepareForm() {
        this.vehicleTypeForm = this.fb.group({ //// Make Model driven form
            'name': this.buildRequiredFormControl(this.vehicleType.name),
            'includeBrandModel': this.buildSimpleFormControl(this.vehicleType.includeBrandModel)
        });
    }

    private buildRequiredFormControl(value?: any): FormControl {
        return new FormControl(value, Validators.required);
    }

    private buildSimpleFormControl(value?: any): FormControl {
        return new FormControl(value, []);
    }

    // Metodo que se lanza cuando se inicializa la página
    ngOnInit() {
        try {
            this.isConfirm = false;
            this.includeText = false;
            this.messageModal = '';
            this.sub = this.route.params.subscribe(params => {
                if (params['id'] === '') {
                    this.id = 0;
                } else {
                    this.id = Number(params['id']);
                }
            });
            if (this.id > 0) { //// Based on id decide Title add/edit
                this.title = 'Edit User Vehicle';
                this.getVehicleTypeData();
            } else {
                this.title = 'Add User Vehicle';
            }
        } catch (e) {
            this.setModalValues('Error occurred while loading vehicle-type data', true);
            this.valido = false;
        }
    }

    // Metodo que se utiliza para inicializar los datos en pantalla cuando se esta en modo edición
    getVehicleTypeData() {
        try {
            this._serviceVehicleType.getAll().subscribe(
                vehicleTypes => {
                    this.vehicleTypes = vehicleTypes;
                    this.vehicleType = this.vehicleTypes.find(val => val.id === this.id);
                },
                error => this.messageModal = <any>error
            );

        } catch (e) { throw e; }
    }

    // Metodo que se utiliza para guardar o actualizar la información de tipo de vehiculos
    save(form, isValid: boolean) {
        try {
            if (isValid) {
                if (this.id === 0) {
                    if (form.includeBrandModel === undefined) {
                        form.includeBrandModel = false; }

                    this._serviceVehicleType.insert(form).subscribe(
                        (res) => {
                            this.setModalValues('Your record is successfully registered!', true);
                            this.valido = true;
                        },
                        (error) => {
                            if (error.status === 500) {
                                this.setModalValues('The vehicle type already exist!', true);
                            } else {
                                this.setModalValues('An error ocurred while saving the record', true);
                            }

                            this.valido = false;
                        }
                    );
                } else {
                    this._serviceVehicleType.update(form, this.id).subscribe(
                        (res) => {
                            this.setModalValues('Your record is successfully modified!', true);
                            this.valido = true;
                        },
                        (error) => {
                            if (error.status === 500) {
                                this.setModalValues('The vehicle type already exist!', true);
                            } else {
                                this.setModalValues('An error ocurred while saving the record', true);
                            }
                            this.valido = false;
                        }
                    );
                }

            }
        } catch (e) { }
    }

    onConfirm() {
        if (this.valido) {
            this.router.navigate(['/smart-cities/vehicle-type/vehicleType']);
        } else {
            this.showDialog = false;
        }
    }

    // Metodo que se utiliza para establecer el mensaje en la ventana modal y establecer si es visible o no
    setModalValues(message: string, show: boolean) {
        this.messageModal = message;
        this.showDialog = show;
    }


}
