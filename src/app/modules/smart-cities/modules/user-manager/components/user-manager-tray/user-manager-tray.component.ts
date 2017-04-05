import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnumEx } from '../../../../../../core/models/EnumEx';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { role } from '../../../../../../core/models/role';
//import { roleId } from '../../../../../../core/models/role-id';
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
  private _user: UserModel= new UserModel();
  private errorMessage: string;
  private successMessage:string;
  private  canDel:boolean=false;
  //Modal
  private showDialog: boolean;
  isConfirm: boolean;
  messageModal: string;
  includeText: boolean;

  constructor(private _service: UserService,private fb: FormBuilder,   
              private router: Router,
              private route: ActivatedRoute) { 
                 this.roles = this.getRoles();
                this.UserTrayForm = fb.group({ //// Make Model driven form
                      "name": [null],
                      "familyname": [null],
                      "email": [null, Validators.compose([Validators.required,CustomValidators.email])],
                      "role": [null],
                      "message":[null],
                      "canDel":[null]                    
                      
                  })
              }

  ngOnInit() {
   
    this.bindTable();
     this.isConfirm = true;
    this.includeText = true;
    this.messageModal = "Are you sure to delete this user?";
  }
  bindTable()
  {
    var rol="SA";
   
     this._service.getAll().subscribe(
      users => { this.users = users;
          this.users.forEach(function(item)
          {
            
            if(item.role == "ADMIN" && rol=="ADMIN")
            {
              item.canDel=false;
            }
            else 
            if(rol=="ADMIN" && item.role!="ADMIN")
            {
                item.canDel=true;
            }
            if(rol=="SA")
            {
              item.canDel=true;
            }
            
            console.log(rol);
            //console.log(this.canDel);
            //item.email = email.toString()
          });
          console.log(users);
          
  },
      error => this.errorMessage = "Error trying retrieve users data. Please try later."
    );

  }

  
    getRoles() {
    let roles: any[] = [];
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
    //this.showDialog = false; /// Close dialog
     console.log(this._user);
     
    var motive = null;//prompt("If you are sure to delete user, then type a motive.", "Motive");
    if (motive != null) {
      this._user.message=motive;
       this._service.delete(this._user)
            .then(form => 
            {
              //this.bindTable();
               location.reload();       
            }).catch(res=>{
              this.errorMessage="Error deleting user. Please try later.";            
            });
      
      
      }
  }
}