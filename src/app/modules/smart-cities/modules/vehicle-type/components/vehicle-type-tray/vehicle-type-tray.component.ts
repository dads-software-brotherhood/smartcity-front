import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { VehicleType } from '../../../../../../core/models/vehicle-type';
import { VehicleTypeService } from '../../../../../../core/services/vehicle-type/vehicle-type.service';
import { LoginService } from '../../../../../../core/services/login/login.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'vehicle-type-tray',
  templateUrl: './vehicle-type-tray.component.html',
  styleUrls: ['./vehicle-type-tray.component.sass'],

})

export class VehicleTypeTrayComponent implements OnInit {

  private vehicleTypes: VehicleType[] = [];
  private ObjvehicleType = new VehicleType();
  // variable que se utiliza para contabilizar el total de columnas que tiene la tabla
  // para utilizar en las busquedas.
  // tslint:disable-next-line:no-inferrable-types
  private sum: number = 0;

  // Variables utilizadas para mostrar la ventana modal, isConfirm=true (Muestra 2 botones Aceptar, Cancelar),
  // isConfirm=false (Muestra solo un botón Aceptar), messageModal (Mensaje que muestra la ventana Modal),
  // includeText (Se utiliza para mostrar un textArea o no)
  private showDialog: boolean;
  private isConfirm: boolean;
  private messageModal: string;
  private includeText: boolean;

  constructor(private _service: VehicleTypeService, private _router: Router, private _loginService: LoginService) {
  }

  ngOnInit() {
    try {
      this.bindTable();
      this.sum = this.getTotalCols(); // asignar a variable "sum" el valor del número total de columnas en la tabla
      this.isConfirm = true;
      this.includeText = false;
      this.messageModal = 'Are you sure to delete this record?';
    } catch (e) {
      this.setValuesModal('An error occurred while loading the vehicle type list', true, false);
    }
  }

  bindTable() { //// Bind vehicles Grid
    try {
      this._service.getAll().subscribe(
        vehicleTypes => { this.vehicleTypes = vehicleTypes; },
        error => this.messageModal = <any>error);
    } catch (e) { throw e; }
  }

  confirmDelete() {
    try {
      if (this.isConfirm) {
        this.showDialog = false;
        this._service.delete(this.ObjvehicleType.id, this.ObjvehicleType.name.trim()).subscribe(
        (res) => {
          this.setValuesModal('Are you sure to delete this record?', false, true);
          this.bindTable();
        },
        (error) => {
          this.setValuesModal('This record can not delete, because is in use', true, false);
        });
      } else {
        this.showDialog = false;
        this.isConfirm = true;
      }
    } catch (e) { }
  }

  // Metodo que se utiliza para contabilizar el número total de columnas de la tabla que muestra
  // los registros de vehiculos quitando las columnas donde se encuentren los botones editrar y
  // eliminar, lo que regresa este metodo se asigna a una variable que se utiliza para las busquedas.
  getTotalCols() {
    try {
      const table = document.getElementById('myTable');
      const trs = document.getElementsByTagName('tr');
      const trFirst = trs[0];
      const tds = trFirst.getElementsByTagName('th');
      for (let i = 0; i < tds.length; i++) {
        this.sum = this.sum + 1;
      }
      return this.sum - 2; // se resta 2 para no tomar en cuenta las ultimas 2 columnas de la tabla (botón editar y eliminar)
    } catch (e) { throw e; }
  }

  // Metodo que se llama cada que se escribe en la caja de texto de busqueda, se utiliza para filtrar
  // datos en la tabla
  FilterData() {
    // Declare variables
    let input, filter, table, tr, td, i, j;

    try {
      input = document.getElementById('myInput');
      filter = input.value.toUpperCase();
      table = document.getElementById('myTable');
      tr = table.getElementsByTagName('tr');

      // Hacer un bucle a través de todas las filas y columnas de la tabla y
      // ocultar las que no coinciden con la consulta
      for (i = 0; i < tr.length; i++) {
        for (j = 0; j < this.sum; j++) {
          td = tr[i].getElementsByTagName('td')[j];
          if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = '';
              break;
            } else {
              tr[i].style.display = 'none';
            }
          }

        }
      }
    } catch (e) {
      this.setValuesModal('An error occurred while performing the search', true, false);
    }
  }

  // Metodo que se utiliza para establecer las propiedades de la ventana modal
  setValuesModal(message: string, show: boolean, confirm: boolean) {
    this.isConfirm = confirm;
    this.messageModal = message;
    this.showDialog = show;
  }

}
