import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { VehicleType } from '../../../../../../core/models/vehicle-type';
import { VehicleTypeService } from '../../../../../../core/services/vehicle-type/vehicle-type.service';

@Component({
  selector: 'vehicle-type-tray',
  templateUrl: './vehicle-type-tray.component.html',
  styleUrls: ['./vehicle-type-tray.component.sass'],

})
export class VehicleTypeTrayComponent implements OnInit {

  errorMessage: string;
  vehicleTypes: VehicleType[] = [];
  ObjvehicleType = new VehicleType();
  sum: number = 0; //variable que se utiliza para contabilizar el total de columnas que tiene la tabla
                   //para utilizar en las busquedas.
  
  //Variables utilizadas para mostrar la ventana modal, isConfirm=true (Muestra 2 botones Aceptar, Cancelar),
  //isConfirm=false (Muestra solo un botón Aceptar), messageModal (Mensaje que muestra la ventana Modal),
  //includeText (Se utiliza para mostrar un textArea o no)
  showDialog: boolean;
  isConfirm: boolean;
  messageModal: string;
  includeText: boolean;

  constructor(private _service: VehicleTypeService, private _router: Router ) { 
  }

  ngOnInit() { 
    try
    { 
    this.bindTable();
    this.sum = this.getTotalCols(); //asignar a variable "sum" el valor del número total de columnas en la tabla
    this.isConfirm = true;
    this.includeText = false;
    this.messageModal = "Are you sure to delete this record?";
    }
    catch(e){this.errorMessage="An error occurred while loading the vehicle list";} 
  }

  bindTable() { //// Bind vehicles Grid
    try
    {
      this._service.getAll().subscribe(
        vehicleTypes => { this.vehicleTypes = vehicleTypes;},
        error => this.errorMessage = <any>error);
    }
    catch(e){throw e;}
  }

  confirmDelete() {
      try
      {
           this.showDialog = false; /// Close dialog
          //  this._service.delete(this.ObjvehicleType.id)
          //    .then(res => true,
          //       error =>  this.errorMessage = <any>error);
          //  location.reload();
      }
      catch(e){this.errorMessage="An error occurred while deleting the registry";}
    }

    getTotalCols(){
      try
      {
      var table = document.getElementById("myTable");
      var trs = document.getElementsByTagName("tr");
      var trFirst = trs[0];
      var tds = trFirst.getElementsByTagName('th');
      for(var i=0;i<tds.length;i++){
          this.sum = this.sum + 1;
      }
      return this.sum - 2; //se resta 2 para no tomar en cuenta las ultimas 2 columnas de la tabla (botón editar y eliminar)
      }
      catch(e){throw e;}
    }

    FilterData() {
    // Declare variables 
      var input, filter, table, tr, td, i, j;
      
      try
      {
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");

    // Loop through all table rows and columns, and hide those who don't match the search query
      for (i = 0; i < tr.length; i++) {
        for(j = 0; j< this.sum; j++)
        {
        td = tr[i].getElementsByTagName("td")[j];
          if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {            
               tr[i].style.display = "";
               break;
            }
            else {
              tr[i].style.display = "none";
            }
          }

        }
      }
    }
    catch(e){this.errorMessage="An error occurred while performing the search";}
    }

  
}
