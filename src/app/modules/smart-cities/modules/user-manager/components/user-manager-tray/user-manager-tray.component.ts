import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EnumEx } from '../../../../../../core/models/EnumEx';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { role } from '../../../../../../core/models/role';
// import { roleId } from '../../../../../../core/models/role-id';
import { CustomValidators } from 'ng2-validation';
import { UserModel } from '../../../../../../core/models/user-model';
import { UserService } from '../../../../../../core/services/user-service/user-service.service';
import { LoginService } from 'app/core/services/login/login.service';
import { IdentityUser } from '../../../../../../core/models/identity-user';
require('zone.js');

@Component({
  selector: 'app-user-manager-tray',
  templateUrl: './user-manager-tray.component.html',
  styleUrls: ['./user-manager-tray.component.sass']
})
export class UserManagerTrayComponent implements OnInit {
  public UserTrayForm: FormGroup;
  public Modal: FormGroup;
  private roles: any[];
  private users: UserModel[] = [];
  private users_: UserModel[] = [];
  private _user: UserModel = new UserModel();
  private errorMessage: string;
  private successMessage: string;
  private canDel = false;
  private loggedRol: string;
  private rol: string;
  private warningMessage: String;
  private userModel: UserModel[] = [];

  identityUser: IdentityUser;

  isAdmin: boolean;
  isSA: boolean;
  isTransportAdmin: boolean;
  // Prompt
  private showDialog: boolean;
  isConfirm: boolean;
  messageModal: string;
  includeText: boolean;
  // Modal
  private modShowDialog: boolean;
  modIsConfirm = false;
  modMessageModal: string;
  modIncludeText = false;

  constructor(private _service: UserService, private fb: FormBuilder, private fm: FormBuilder,
    private router: Router, private loginService: LoginService,
    private route: ActivatedRoute) {
    this.roles = this.getRoles();
    this.UserTrayForm = fb.group({ //// Make Model driven form
      'name': [null, Validators.required],
      'familyname': [null],
      'email': [null],
      'role': [null],
      'message': [null],
      'canDel': [null]

    });
    this.Modal = fm.group({ //// Make Model driven form

      'message': [null, Validators.required]


    });
  }

  ngOnInit() {
    this.getAll();
    this.isConfirm = true;
    this.includeText = true;
    this.messageModal = 'Are you sure to delete this user?';
  }

  bindTable() {
  }

  getBy(form) {
    this.errorMessage = null;
    this._user.name = $('#name').val();
    this._user.familyName = $('#familyname').val();
    this._user.email = $('#email').val();
    this._user.role = form.role;
    this._service.getBy(this._user)
      .then(res => {
        this.users = res;
        this.userCanDel(this.rol, this.users);

      }).catch(err => {
        this.modShowDialog = true;
        this.modMessageModal = 'Information not found';
        this.includeText = false;
      });


  }

  userCanDel(rol: string, arr: UserModel[]) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].role === 'ADMIN' && this.loginService.isAdmin) {
        arr[i].canDel = false;
      } else if (this.loginService.isAdmin && arr[i].role !== 'ADMIN') {
        arr[i].canDel = true;
      }

      if (this.loginService.isSA) {
        arr[i].canDel = true;
      }
    }
  }

  getAll() {

    this.warningMessage = null;
    this.errorMessage = null;

    this._service.getAll().subscribe(
      users => {
      this.users = users;
        this.userCanDel(this.rol, users);
        console.log(users);
        this.includeText = true;


      },
      (error) => {

        this.modShowDialog = true;
        this.modMessageModal = 'Information not found';
      }
    );
  }

  getRoles() {
    const roles: any[] = [];
    const rolesEnumList = EnumEx.getNamesAndValues(role);

    // Convert name-value pairs to VehicleType[]
    rolesEnumList.forEach(pair => {
      const role = { 'id': pair.value.toString(), 'name': pair.name };
      if (role.name !== 'SA') {
        roles.push(role);
      }
    });
    return roles;
  }

  deleteUser() {
    // this.showDialog = false; /// Close dialog

    this._user.message = $('#_message').val();
    this.showDialog = false;
    this.modShowDialog = true;
    this._service.delete(this._user)
      .then(form => {
        this.modMessageModal = 'User deleted successfully!!';
        this.includeText = false;
        this.Modal.reset();
        this.getAll();
      }).catch(res => {
        this.modMessageModal = 'Error deleting user. Please try later.';
        this.includeText = false;
      });
  }

  clear() {
    this.getAll();
    this.UserTrayForm.reset();
  }

}
