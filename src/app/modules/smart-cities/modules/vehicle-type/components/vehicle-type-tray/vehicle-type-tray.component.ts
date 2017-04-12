import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { VehicleTypesModel } from '../../../../../../core/models/vehicle-types';
import { VehicleTypesService } from '../../../../../../core/services/vehicle-type/vehicle-type.service';

@Component({
  selector: 'vehicle-type-tray',
  templateUrl: './vehicle-type-tray.component.html',
  styleUrls: ['./vehicle-type-tray.component.sass'],

})
export class VehicleTypeTrayComponent implements OnInit {

  errorMessage: string;
//   vehicles: Vehicle[] = [];
//   Objvehicle = new Vehicle();
  sum: number = 0; //variable que se utiliza para contabilizar el total de columnas que tiene la tabla
                   //para utilizar en las busquedas.
  
  //Variables utilizadas para mostrar la ventana modal, isConfirm=true (Muestra 2 botones Aceptar, Cancelar),
  //isConfirm=false (Muestra solo un botón Aceptar), messageModal (Mensaje que muestra la ventana Modal),
  //includeText (Se utiliza para mostrar un textArea o no)
  showDialog: boolean;
  isConfirm: boolean;
  messageModal: string;
  includeText: boolean;

  constructor(private _router: Router ) { 
  }

  ngOnInit() {  
  }

  
}
