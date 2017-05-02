import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Vehicle } from '../../../../../../core/models/vehicle';
import { VehicleService } from '../../../../../../core/services/vehicle/vehicle.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'user-vehicle-tray',
  templateUrl: './user-vehicle-tray.component.html',
  styleUrls: ['./user-vehicle-tray.component.sass'],

})
export class UserVehicleTrayComponent implements OnInit {

  private vehicles: Vehicle[] = [];
  private Objvehicle = new Vehicle();

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

  constructor(private _service: VehicleService, private _router: Router) {
  }

  ngOnInit() {
    try {
      this.bindTable();
      this.isConfirm = true;
      this.messageModal = 'Are you sure to delete this record?';
      // asignar a variable "sum" el valor del número total de columnas en la tabla
      this.sum = this.getTotalCols();
      this.includeText = false;
    } catch (e) {
       this.setValuesModal('An error occurred while loading the vehicle list', true, false);
    }
  }

  // Metodo que se utiliza para el llenado de la tabla con los datos de los vehiculos
  // registrados.
  bindTable() {
    try {
      this._service.getAll().subscribe(vehicles => {
        this.vehicles = vehicles;
        this.vehicles.forEach(function (item, index) {
          item.index = index.toString();
        });
      }, error => this.messageModal = <any>error);
    } catch (e) {
      throw e;
    }
  }

  // Metodo que se llama cuando se confirma la eliminación del registro
  confirmDelete() {
    try {
      if (this.isConfirm) {
        this._service.delete(this.Objvehicle.index).subscribe(
          (res) => {
            this.setValuesModal('Are you sure to delete this record?', false, true);
            this.bindTable();
          },
          (error) => {
            this.setValuesModal('An error occurred while deleting the registry', true, false);
          });
      } else {
         this.showDialog = false;
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
      // se resta 2 para no tomar en cuenta las ultimas 2 columnas de la tabla (botón editar y eliminar)
      return this.sum - 2;
    } catch (e) { throw e; }
  }

  // Metodo que se llama cada que se escribe en la caja de texto de busqueda, se utiliza para filtrar
  // datos en la tabla
  FilterData() {
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
       this.setValuesModal('An error occurred while search a vehicle', true, false);
    }
  }

  setValuesModal(message: string, show: boolean, confirm: boolean) {
    this.isConfirm = confirm;
    this.messageModal = message;
    this.showDialog = show;
  }

}
