import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnumEx } from '../../../../../../core/models/EnumEx';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { role } from '../../../../../../core/models/role';
import { CustomValidators } from 'ng2-validation';
@Component({
  selector: 'app-user-manager-tray',
  templateUrl: './user-manager-tray.component.html',
  styleUrls: ['./user-manager-tray.component.sass']
})
export class UserManagerTrayComponent implements OnInit {
  public UserTrayForm : FormGroup;
  private roles: any[];
  private users: any[];
  errorMessage: string;
  constructor(private fb: FormBuilder,   
              private router: Router,
              private route: ActivatedRoute) { 
                 this.roles = this.getRoles();
                this.UserTrayForm = fb.group({ //// Make Model driven form
                      "name": [null],
                      "familyname": [null],
                      "email": [null, Validators.compose([Validators.required,CustomValidators.email])],
                      "role": [null]
                      
                      
                  })
              }

  ngOnInit() {
  }
    getRoles() {
    let roles: any[] = [];

    //Get name-value pairs from VehicleTypeEnum
    let rolesEnumList = EnumEx.getNamesAndValues(role);

    //Convert name-value pairs to VehicleType[]
    rolesEnumList.forEach(pair => {
        let role = { 'id': pair.value.toString(), 'name': pair.name };
        roles.push(role);
    });
    return roles;
}
  deleteUser(){
    var person = prompt("Please enter your name", "");
if (person != null) {
   alert(person.toString());
   }
  }
}