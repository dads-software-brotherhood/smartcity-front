import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnumEx } from '../../../../../../core/models/EnumEx';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { role } from '../../../../../../core/models/role';
import { CustomValidators } from 'ng2-validation';
import { UserModel } from '../../../../../../core/models/user-model';
import { UserService } from '../../../../../../core/services/user-service/user-service.service';
@Component({
  selector: 'app-user-manager-tray',
  templateUrl: './user-manager-tray.component.html',
  styleUrls: ['./user-manager-tray.component.sass']
})
export class UserManagerTrayComponent implements OnInit {
  public UserTrayForm : FormGroup;
  private roles: any[];
  private users: UserModel[] = [];
  errorMessage: string;
  private  canDel:boolean=false;
  constructor(private _service: UserService,private fb: FormBuilder,   
              private router: Router,
              private route: ActivatedRoute) { 
                 this.roles = this.getRoles();
                this.UserTrayForm = fb.group({ //// Make Model driven form
                      "name": [null],
                      "familyname": [null],
                      "email": [null, Validators.compose([Validators.required,CustomValidators.email])],
                      "role": [null],
                      "canDel":[null]                    
                      
                  })
              }

  ngOnInit() {
   
    this.bindTable();
  }
  bindTable()
  {
    var rol="SA";
   
     this._service.getAll().subscribe(
      users => { this.users = users;
          this.users.forEach(function(item)
          {
            item.role="ADMIN";
            if(item.role == "ADMIN" && rol=="ADMIN")
            {
              item.canDel=false;
            }
            else 
            if(rol="SA")
            {item.canDel=true;
            }
            
            console.log(rol);
            //console.log(this.canDel);
            //item.email = email.toString()
          });
  },
      error => this.errorMessage = <any>error
    );

  }

  
    getRoles() {
    let roles: any[] = [];

    //Get name-value pairs from VehicleTypeEnum
    let rolesEnumList = EnumEx.getNamesAndValues(role);

    //Convert name-value pairs to VehicleType[]
    rolesEnumList.forEach(pair => {
        let role = { 'id': pair.value.toString(), 'name': pair.name };
        if(role.name!="SA")
        {
          roles.push(role);
        }
        
    });
    return roles;
}
  deleteUser(){
    var person = prompt("", "");
    if (person != null) {
      alert(person.toString());
      }
  }
}