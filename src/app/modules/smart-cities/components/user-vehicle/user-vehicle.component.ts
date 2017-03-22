import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { Vehicle } from '../../../../core/models/vehicle';
import { VehicleService } from '../../../../core/services/vehicle/vehicle.service';

@Component({
  selector: 'user-vehicle',
  templateUrl: './user-vehicle.component.html',
  styleUrls: ['./user-vehicle.component.sass']
})
export class UserVehicleComponent implements OnInit {

  errorMessage: string;
  vehicles: Vehicle[] = [];
  Objvehicle = new Vehicle();
  loadingIndicator: boolean = true;

  constructor(private _service: VehicleService, private _router: Router ) { 
  }

  ngOnInit() {   
    this.loadingIndicator = true;
    this.bindTable();
  }

  bindTable() { //// Bind vehicles Grid
    this._service.getAll().subscribe(
      vehicles => { this.vehicles = vehicles;
    this.loadingIndicator = false;
  },
      error => this.errorMessage = <any>error
    );
  }

}
