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
import { LoginService } from 'app/core/services/login/login.service';
import { IdentityUser } from '../../../../../../core/models/identity-user';
require ('zone.js');

@Component({
  selector: 'app-user-manager-tray',
  templateUrl: './user-manager-tray.component.html',
  styleUrls: ['./user-manager-tray.component.sass']
})
export class UserManagerTrayComponent implements OnInit {
  public UserTrayForm : FormGroup;
   public Modal : FormGroup;
  private roles: any[];
  private users: UserModel[] = [];
    private users_: UserModel[] = [];
  private _user: UserModel= new UserModel();
  private errorMessage: string;
  private successMessage:string;
  private  canDel:boolean=false;
  private loggedRol:string;
  private rol:string;
  private warningMessage:String;

   identityUser: IdentityUser;

  isAdmin:            boolean;
  isSA:               boolean;
  isTransportAdmin:   boolean;
  //Prompt
  private showDialog: boolean;
  isConfirm: boolean;
  messageModal: string;
  includeText: boolean;
  //Modal
  private modShowDialog: boolean;
  modIsConfirm: boolean=false;
  modMessageModal: string;
  modIncludeText: boolean=false;

  constructor(private _service: UserService,private fb: FormBuilder,private fm: FormBuilder,   
              private router: Router, private loginService: LoginService,
              private route: ActivatedRoute) { 
                 this.roles = this.getRoles();
                this.UserTrayForm = fb.group({ //// Make Model driven form
                      "name": [null, Validators.required],
                      "familyname": [null],
                      "email": [null],
                      "role": [null],
                      "message":[null],
                      "canDel":[null]                    
                      
                  })
                  this.Modal = fm.group({ //// Make Model driven form
                      
                      "message":[null, Validators.required]
                                        
                      
                  })
              }

  ngOnInit() {
     this.getAll();
     this.isConfirm = true;
    this.includeText = true;
    this.messageModal = "Are you sure to delete this user?";
    console.log(this.loginService.getLoggedUser());
    if(this.loginService.getLoggedUser().roles[0]!=null || this.loginService.getLoggedUser().roles[0]!=undefined)
    {
       this.rol=this.loginService.getLoggedUser().roles[0];
       if (this.rol=="USER" || this.rol== "TRANSPORT_ADMIN")
       {
          this.router.navigate(["/smart-cities"]);
       }
    }
    else{
      this.router.navigate(["/smart-cities"]);
    }

  
   
   
  }
  bindTable()
  {
      

  }
  getBy()
  {
      
   
    this.errorMessage=null;
     this._user.name=$("#name").val();
      this._user.familyName=$("#familyname").val();
      this._user.email=$("#email").val();
      this._user.role=$("#role").val();
    console.log(this._user);
      this._service.getBy(this._user)
            .then(res => 
            {
             this.users=res;
             console.log(this.users);
             
              this.userCanDel(this.rol, this.users);      
               
            }).catch(err=>{
              this.modShowDialog=true;
              this.modMessageModal="Information not found";            
            });
    

  }
  userCanDel(rol:string, arr:UserModel[]){
     arr.forEach(function(item)
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
          });
         
  }

  getAll(){
    
    this.warningMessage=null;
    this.errorMessage=null;
   
     this._service.getAll().subscribe(
      users => { this.users = users;
        this.userCanDel(this.rol, users);
        console.log(users);
         
       
          
  },
      (error) => {

        this.modShowDialog=true;
              this.modMessageModal="Information not found";  
      }
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
    
    this.warningMessage=null;
    this.errorMessage=null;
     var x = $("#_message").val();
    
     this._user.message = x;
      this._service.delete(this._user)
            .then(form => 
            {
              //this.bindTable();
               location.reload();       
            }).catch(res=>{
              this.modShowDialog=true;
              this.modMessageModal="Error deleting user. Please try later.";  
                         
            });
  }

  clear()
  {
    this.getAll();
    this.UserTrayForm.reset();
   
     
  }
}