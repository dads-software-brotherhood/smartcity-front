import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './user-vehicle-detail.component.html',
  styleUrls: ['./user-vehicle.component.sass']
})
export class UserVehicleDetailComponent implements OnInit {
  public id: string;
  public title: string;


  private sub: any;

  constructor() { }

  ngOnInit() {

        if (this.id != "") { //// Based on id decide Title add/edit
            this.title = "Edit User Vehicle"
        } else {
            this.title = "Add User Vehicle"
        }

        if (!this.id) {
            return;
        }
  }

}
