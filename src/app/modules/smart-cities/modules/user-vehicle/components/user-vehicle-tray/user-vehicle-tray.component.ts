import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { Vehicle } from '../../../../../../core/models/vehicle';
import { VehicleService } from '../../../../../../core/services/vehicle/vehicle.service';

@Component({
  selector: 'user-vehicle-tray',
  templateUrl: './user-vehicle-tray.component.html',
  styleUrls: ['./user-vehicle-tray.component.sass'],

})
export class UserVehicleTrayComponent implements OnInit {

  errorMessage: string;
  vehicles: Vehicle[] = [];
  Objvehicle = new Vehicle();
  sum: number = 0; //variable que se utiliza para contabilizar el total de columnas que tiene la tabla
                   //para utilizar en las busquedas.
  
  //Variables utilizadas para mostrar la ventana modal, isConfirm=true (Muestra 2 botones Aceptar, Cancelar),
  //isConfirm=false (Muestra solo un botón Aceptar), messageModal (Mensaje que muestra la ventana Modal),
  //includeText (Se utiliza para mostrar un textArea o no)
  showDialog: boolean;
  isConfirm: boolean;
  messageModal: string;
  includeText: boolean;

  constructor(private _service: VehicleService, private _router: Router ) { 
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
      vehicles => { this.vehicles = vehicles;
          this.vehicles.forEach(function(item, index){
              item.index = index.toString();
            });
  },
      error => this.errorMessage = <any>error
    );
  }
  catch(e){throw e;}
  }

  confirmDelete() {
      try
      {
           this.showDialog = false; /// Close dialog
           this._service.delete(this.Objvehicle.index)
             .then(res => true,
                error =>  this.errorMessage = <any>error);
           location.reload();
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
