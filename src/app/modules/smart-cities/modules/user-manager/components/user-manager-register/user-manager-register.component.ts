import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnumEx } from '../../../../../../core/models/EnumEx';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { role } from '../../../../../../core/models/role';
import { CustomValidators } from 'ng2-validation';

import {IdentityUser} from '../../../../../../core/models/identity-user';
import { LoginService } from '../../../../../../core/services/login/login.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-manager-register.component.html',
  styleUrls: ['./user-manager-register.component.sass']
})
export class UserManagerRegisterComponent implements OnInit {
  public adminUserRegisterForm : FormGroup;
  identityUser: IdentityUser;
  private userRoles: any[];
  private roles: any[];
  errorMessage: string;

  constructor(private fb: FormBuilder,   
              private router: Router,
              private route: ActivatedRoute, private loginService: LoginService) { 
                
                this.roles = this.getRoles();
                this.adminUserRegisterForm = fb.group({ //// Make Model driven form
                      "name": [null, Validators.required],
                      "familyname": [null, Validators.required],
                      "email": [null, Validators.compose([Validators.required,CustomValidators.email])],
                      "role": [null, Validators.required],
                      
                  })
              }

              private sub: any;
  ngOnInit() {
    var index;
    this.identityUser = this.loginService.getLoggedUser();
    console.log(this.loginService.getLoggedUser());
    for (index = 0; index < this.identityUser.roles.length; ++index) {
    console.log(this.identityUser.roles[index]);
}
    
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
}