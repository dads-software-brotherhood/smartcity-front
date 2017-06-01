import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnumEx } from '../../../../../../core/models/EnumEx';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { role } from '../../../../../../core/models/role';
// import { roleId } from '../../../../../../core/models/role-id';
import { UserModel } from '../../../../../../core/models/user-model';
import { CustomValidators } from 'ng2-validation';
import {UserService} from '../../../../../../core/services/user-service/user-service.service';
import {IdentityUser} from '../../../../../../core/models/identity-user';
import { LoginService } from '../../../../../../core/services/login/login.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-manager-register.component.html',
  styleUrls: ['./user-manager-register.component.sass']
})
export class UserManagerRegisterComponent implements OnInit {
  public adminUserRegisterForm: FormGroup;
  identityUser: IdentityUser;
  userService: UserService;
  private userRoles: any[];
  private roles: any[];
  errorMessage: string;
  private rol: string;
  private userModel: UserModel[] = [];
  private  registerSubs: any;
  // private vehicle = new UserModel();

  // Modal
  private modShowDialog: boolean;
  modIsConfirm = false;

  modIncludeText = false;

  private sub: any;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute, private loginService: LoginService, private _service: UserService) {
               this.roles = this.getRoles();
                this.adminUserRegisterForm = fb.group({ //// Make Model driven form
                      'name': [null, Validators.required],
                      'familyName': [null, Validators.required],
                      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
                      'role': [null, Validators.required]
                  });
              }

  ngOnInit() {

    // this.identityUser = this.loginService.getLoggedUser();
    // this.rol= this.identityUser.roles[0].toString();
    if (this.loginService.getLoggedUser().roles[0] !== null || this.loginService.getLoggedUser().roles[0] !== undefined) {
       this.rol = this.loginService.getLoggedUser().roles[0];
       if (this.rol === 'USER' || this.rol === 'TRANSPORT_ADMIN') {
          this.router.navigate(['/smart-cities']);
       }
    } else {
      this.router.navigate(['/smart-cities']);
    }
  }

  getRoles() {
    const roles: any[] = [];
    // let index; // = array.indexOf(5);

    // Get name-value pairs from VehicleTypeEnum
    const rolesEnumList = EnumEx.getNamesAndValues(role);

    // Convert name-value pairs to VehicleType[]
    rolesEnumList.forEach(pair => {
        const role = { 'id': pair.value.toString(), 'name': pair.name };
        if (this.rol === 'ADMIN') {
         if (role.name !== 'SA' && role.name !== 'ADMIN') {
             roles.push(role);
           }
         } else {
            if (role.name !== 'SA') {
             roles.push(role);
           }
         }
          });
    return roles;
  }

  save(form, isValid: boolean) {
            this.modShowDialog = true;
         this.registerSubs = this._service.register(form).subscribe(
      (res) => {
        // alert('Message\nThe token has been sent to your mail, please check your tray');
      this.modIsConfirm = true;
         this.errorMessage = 'User registered successfully';
      },
      (error) => {
        if (error.status && error.status === 409) {
               this.errorMessage = 'The email is already in use.';
        } else {
         this.errorMessage = 'An error has ocurred sendind user information. Please try again later';
        }
      }
    );
  }

  redirect() {
    this.router.navigate(['/smart-cities/user-manager/user-manager-tray']);
  }

}
