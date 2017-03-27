import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { Vehicle } from '../../../../core/models/vehicle';
import { VehicleService } from '../../../../core/services/vehicle/vehicle.service';

@Component({
  selector: 'user-vehicle',
  templateUrl: './user-vehicle.component.html',
  styleUrls: ['./user-vehicle.component.sass'],

})
export class UserVehicleComponent implements OnInit {

  errorMessage: string;
  vehicles: Vehicle[] = [];
  Objvehicle = new Vehicle();
  loadingIndicator: boolean = true;
  sum: number = 0;

  //  columns = [
  //   { prop: 'name', name: 'Name' },
  //   { prop: 'vehicleType', name: 'Vehicle Type' },
  //   { prop: 'brandName', name: 'Brand Name' },
  //   { prop: 'modelName', name: 'Model Name'}
  // ];

  constructor(private _service: VehicleService, private _router: Router ) { 
  }

  ngOnInit() {   
    this.loadingIndicator = true;
    this.bindTable();
    this.sum = this.getTotalRows();
  }

  bindTable() { //// Bind vehicles Grid
    this._service.getAll().subscribe(
      vehicles => { this.vehicles = vehicles;
    this.loadingIndicator = false;
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
      return this.sum - 2;
    }

    FilterData() {
    // Declare variables 
      var input, filter, table, tr, td, i, j;
      
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
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
