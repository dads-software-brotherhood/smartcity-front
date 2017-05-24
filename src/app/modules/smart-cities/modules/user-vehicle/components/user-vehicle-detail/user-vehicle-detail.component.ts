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
    public subTitle: string;
    private vehicleTypes: VehicleType[];
    private fuelTypes: any[];
    private vehicles: Vehicle[] = [];
    private vehiclesCharge: Vehicle[] = [];
    private successMessage: string;
    private vehicle = new Vehicle();
    private type: string;

    // Variables utilizadas para mostrar la ventana modal, isConfirm=true (Muestra 2 botones Aceptar, Cancelar),
    // isConfirm=false (Muestra solo un botón Aceptar), messageModal (Mensaje que muestra la ventana Modal),
    // includeText (Se utiliza para mostrar un textArea o no)
    private showDialog: boolean;
    private isConfirm: boolean;
    private messageModal: string;
    private includeText: boolean;

    // tslint:disable-next-line:no-inferrable-types
    private valido: boolean = false;
    // tslint:disable-next-line:no-inferrable-types
    private vehicleTypeId: number = 0;

    constructor(private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _service: VehicleService,
        private _serviceVehicleType: VehicleTypeService) {
        try {
            this.prepareForm();
        } catch (e) {
            this.setValuesModal('Error occurred while loading vehicle data', true);
        }
    }

    // tslint:disable-next-line:member-ordering
    private sub: any;

    private prepareForm() {
        this.vehicleForm = this.fb.group({ //// Make Model driven form
            'name': this.buildRequiredFormControl(this.vehicle.name),
            'brandName': this.buildSimpleFormControl(this.vehicle.brandName),
            'modelName': this.buildSimpleFormControl(this.vehicle.modelName),
            'description': this.buildSimpleFormControl(this.vehicle.description),
            'vehiclPlateIdentifier': this.buildSimpleFormControl(this.vehicle.vehiclPlateIdentifier),
            'vehicleType': this.buildRequiredFormControl(this.vehicleTypeId),
            'fuelType': this.buildRequiredFormControl(this.vehicle.fuelType),
            'fuelConsumption': this.buildSimpleFormControl(this.vehicle.fuelConsumption),
            'favorite': this.buildSimpleFormControl(this.vehicle.favorite)
        });
    }

    private buildRequiredFormControl(value?: any): FormControl {
        return new FormControl(value, Validators.required);
    }

    private buildSimpleFormControl(value?: any): FormControl {
        return new FormControl(value, []);
    }

    ngOnInit() {
        try {
            this.isConfirm = false;
            this.includeText = false;
            this.messageModal = '';
            this.fuelTypes = this.getFuelTypes();
            this.bindTable();
            this.sub = this.route.params.subscribe(params => {
                this.index = params['id'];
            });
            if (this.index !== '') { //// Based on id decide Title add/edit
                this.title = 'Edit a means of transport';
                this.subTitle ='You can edit a new means of transport, such as a vehicle, bicycle and motocycle.'
                this.getVehicleData();
            } else {
                this.title = 'Register a means of transport';
                this.subTitle ='You can register a new means of transport, such as a vehicle, bicycle and motocycle.'
                this.getVehicleTypes();
            }

        } catch (e) {
            this.setValuesModal('Error occurred while loading vehicle data', true);
        }
    }

    onChangeVehicleType(event) {
        let indice: number;
        indice = 0;
        indice = event.srcElement.selectedIndex;
        this.type = event.srcElement.options[indice].innerText;
    }

    // Metodo que se utiliza para llenar los datos del vehiculo cuando se esta en modo de
    // edición
    getVehicleData() {
        try {
            this._service.getAll().subscribe(
                (res) => {
                    this.vehicle = res[this.index];
                    this.type = this.vehicle.type;
                    this.getVehicleTypes();
                },
                (error) => {
                    this.messageModal = error;
                });
        } catch (e) { throw e; }
    }

    // Metodo que se utiliza para cargar el combo de VehicleType
    getVehicleTypes() {
        try {
            this._serviceVehicleType.getAll().subscribe(
                (res) => {
                    this.vehicleTypes = res;
                    if (this.index !== '') {
                        if (this.vehicle.vehicleType !== undefined) {
                            for (let i = 0; i < this.vehicleTypes.length; i++) {
                                if (this.vehicle.vehicleType.id === this.vehicleTypes[i].id) {
                                    this.vehicleTypeId = this.vehicleTypes[i].id;
                                }
                            }
                            this.prepareForm();
                        }
                    } else {
                        if (this.vehicle.vehicleType !== undefined) {
                            this.vehicleTypeId = this.vehicle.vehicleType.id;
                            this.prepareForm();
                        }
                    }
                },
                (error) => {
                    this.messageModal = error;
                });
        } catch (e) { throw e; }
    }

    // Metodo que se utiliza para llenar el combo de FuelType, este combo se llena
    // tomando los datos de un enumerador
    getFuelTypes() {
        try {
            const fuelTypes: any[] = [];
            // Obtener pares nombre-valor de VehicleTypeEnum
            const fuelTypeEnumList = EnumEx.getNamesAndValues(FuelType);
            // Convertir los nombres-valores a VehicleType[]
            fuelTypeEnumList.forEach(pair => {
                const fuelType = { 'id': pair.value.toString(), 'name': pair.name };
                fuelTypes.push(fuelType);
            });
            return fuelTypes;
        } catch (e) { throw e; }
    }

    // Metodo que se utiliza para llenar un arreglo de tipo vehiculos, el cual se utiliza
    // posteriormente para
    bindTable() {
        try {
            this._service.getAll().subscribe(vehicles => {
                this.vehicles = vehicles;
            }, error => this.messageModal = <any>error);
        } catch (e) { throw e; }
    }

    findVehicleType(id): VehicleType {
        for (let i = 0; i < this.vehicleTypes.length; i++) {
            if (this.vehicleTypes[i].id === id) {
                return this.vehicleTypes[i];
            }
        }
    }

    // Metodo que se utiliza para guardar o actualizar un registro de vehiculo, incluye las validaciones
    // para verificar que el nombre de la marca y modelo sean obligatorios para los tipos de vehiculos
    // que asi lo requieran y verificar que no existan nombres de vehiculos repetidos.
    save(form, isValid: boolean) {
        this.successMessage = null;
        let isRepeat = false;
        let vehicleName;
        let vehicleNameNew;

        try {
            if (isValid) {
                vehicleName = this.vehicle.name.toUpperCase().trim();
                this.vehicle.vehicleType = this.findVehicleType(form.vehicleType);

                if (this.vehicle.vehicleType.includeBrandModel) {
                    if (this.vehicle.brandName !== '' && this.vehicle.modelName !== '' && this.vehicle.brandName !== undefined
                        && this.vehicle.modelName !== undefined) {
                            this.valido = true;
                        }
                } else {
                    this.valido = true;
                }

                if (this.index === '') {
                    for (let i = 0; i < this.vehicles.length; i++) {
                        if (vehicleName === this.vehicles[i].name.toUpperCase().trim()) {
                            this.valido = false;
                            isRepeat = true;
                        }
                    }
                } else {
                    vehicleName = this.vehicles[this.index].name.toUpperCase().trim();
                    if (vehicleName !== this.vehicle.name.toUpperCase().trim()) {
                        vehicleNameNew = this.vehicle.name.toUpperCase().trim();
                        for (let i = 0; i < this.vehicles.length; i++) {
                            if (vehicleNameNew === this.vehicles[i].name.toUpperCase().trim()) {
                                this.valido = false;
                                isRepeat = true;
                            }
                        }
                    }
                }

                if (this.valido) {
                    form.vehicleType = this.vehicle.vehicleType;
                    form.type = this.type.trim();
                    if (form.favorite === undefined || form.favorite === null) {
                        form.favorite = false;
                    }

                    if (this.index === '') {
                        this._service.insert(form).subscribe(
                            (res) => {
                                this.valido = true;
                                this.setValuesModal('The information was successfully saved!', true);
                            },
                            (error) => {
                                this.valido = false;
                                this.setValuesModal('An error ocurred while saving the record', true);
                            }
                        );

                    } else {
                        this._service.update(form, this.index).subscribe(
                            (res) => {
                                this.valido = true;
                                this.setValuesModal('The information was successfully modified!', true);
                            },
                            (error) => {
                                this.valido = false;
                                this.setValuesModal('An error ocurred while saving the record', true);
                            });
                    }

                } else if (!this.valido && isRepeat) {
                    this.setValuesModal('There is already a vehicle with that name registered', true);
                } else if (!this.valido && !isRepeat) {
                    this.setValuesModal('For this type of vehicle, Brand Name and Model Name are required', true);
                }
            }
        } catch (e) { }
    }

    // Metodo que se manda a llamar al hacer clic en Aceptar de la ventana modal
    onConfirm() {
        if (this.valido) {
            this.router.navigate(['/smart-cities/user-vehicle/vehicles']);
        } else {
            this.showDialog = false;
        }
    }

    // Metodo que se utiliza para filtrar caracteres introducidos a las cajas de texto,
    // para que solo acepten valores númericos enteros y decimales.
    restrictNumeric(e, object) {
        let input;
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
            if (object.value !== undefined && object.value !== '') {
                if (object.value.indexOf('.') > 0) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
        input = String.fromCharCode(e.which);
        return !!/[\d\s]/.test(input);
    }

    setValuesModal(message: string, show: boolean) {
        this.messageModal = message;
        this.showDialog = show;
        this.getVehicleTypes();
    }

}
