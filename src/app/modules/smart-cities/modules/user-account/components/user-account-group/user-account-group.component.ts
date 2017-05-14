import { Component, OnInit, Compiler } from '@angular/core';

import { LoginService } from 'app/core/services/login/login.service';
import { GroupProfileService } from 'app/core/services/user-profile/group-profile.service';
import { GroupProfile } from 'app/core/models/group-profile';
import { Group } from 'app/core/models/group';
import { GroupService } from 'app/core/services/group/group.service';



@Component({
  selector: 'app-user-account-group',
  templateUrl: './user-account-group.component.html',
  providers: [LoginService, GroupProfileService],
  styleUrls: ['./user-account-group.component.sass']
})
export class UserAccountGroupComponent implements OnInit {

  idUser: string;
  errorMessage: string;
  messageModal: string;
  showDialog: boolean;
  successMessage: string;
  groups: Array<GroupProfile>;
  groupsCheck: Array<GroupProfile>;
  count: number;


  sum: number = 0; //variable que se utiliza para contabilizar el total de columnas que tiene la tabla
  //para utilizar en las busquedas.

  //Variables utilizadas para mostrar la ventana modal, isConfirm=true (Muestra 2 botones Aceptar, Cancelar),
  //isConfirm=false (Muestra solo un botón Aceptar), messageModal (Mensaje que muestra la ventana Modal),
  //includeText (Se utiliza para mostrar un textArea o no)
  isConfirm: boolean;
  includeText: boolean;

  constructor(private groupProfileService: GroupProfileService, private loginService: LoginService, private _compiler: Compiler) {


    this.groups = new Array<GroupProfile>();

    this.idUser = this.loginService.getLoggedUser().id;
    this.groupProfileService.loadById(this.idUser).subscribe(groups => { this.groups = groups; });

  }




  ngOnInit() {
    /*try {
      this.bindTable();
      this.sum = this.getTotalCols(); //asignar a variable "sum" el valor del número total de columnas en la tabla
      this.isConfirm = true;
      this.includeText = false;
      this.messageModal = "Are you sure to delete this register of his group?";
    }
    catch (e) { this.errorMessage = "An error occurred while loading the group list"; }*/
  }

  getTotalCols() {
    try {
      var table = document.getElementById("myTable");
      var trs = document.getElementsByTagName("tr");
      var trFirst = trs[0];
      var tds = trFirst.getElementsByTagName('th');
      for (var i = 0; i < tds.length; i++) {
        this.sum = this.sum + 1;
      }
      return this.sum - 2; //se resta 2 para no tomar en cuenta las ultimas 2 columnas de la tabla (botón editar y eliminar)
    }
    catch (e) { throw e; }
  }

  save() {
    this.groupsCheck = new Array<GroupProfile>();
    this.errorMessage = null;
    this.messageModal = null;
    this.groupProfileService
      .patch(this.idUser, this.groups)
      .then(groups => {
        this.groupsCheck = groups;
        this.errorMessage = 'Your group/groups are successfully saved!!';
        location.reload();
        //this.showDialog = true;
        /* } else {
            this.messageModal = 'Your group/groups are not successfully saved!!';
            this.showDialog = true;
         }*/
      });

  }
}
