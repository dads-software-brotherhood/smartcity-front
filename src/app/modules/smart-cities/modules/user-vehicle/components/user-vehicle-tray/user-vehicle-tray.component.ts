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

  constructor(private _service: VehicleService, private _router: Router ) { 
  }

  ngOnInit() {   
    this.bindTable();
    this.sum = this.getTotalRows(); //asignar a variable "sum" el valor del número total de columnas en la tabla
  }

  bindTable() { //// Bind vehicles Grid
    this._service.getAll().subscribe(
      vehicles => { this.vehicles = vehicles;
  },
      error => this.errorMessage = <any>error
    );
  }

  confirmDelete(index) {
        var conf = window.confirm("Are you sure you want to permanently delete this vehicle?");
        if(conf == true){
          this._service.delete(index)
            .then(res => true,
                error =>  this.errorMessage = <any>error);
          location.reload();
        }
        
    }

    getTotalRows(){
      var table = document.getElementById("myTable");
      var trs = document.getElementsByTagName("tr");
      var trFirst = trs[0];
      var tds = trFirst.getElementsByTagName('th');
      for(var i=0;i<tds.length;i++){
          this.sum = this.sum + 1;
      }
      return this.sum - 2; //se resta 2 para no tomar en cuenta las ultimas 2 columnas de la tabla (botón editar y eliminar)
    }

    FilterData() {
    // Declare variables 
      var input, filter, table, tr, td, i, j;
      
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
            } else {
            tr[i].style.display = "none";
            }
          }

        }
      }
    }

}
