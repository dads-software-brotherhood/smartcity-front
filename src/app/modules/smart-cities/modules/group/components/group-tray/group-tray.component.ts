import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { Group } from '../../../../../../core/models/group';
import { GroupService } from '../../../../../../core/services/group/group.service';

@Component({
  selector: 'group-tray',
  templateUrl: './group-tray.component.html',
  styleUrls: ['./group-tray.component.sass'],

})
export class GroupTrayComponent implements OnInit {

  errorMessage: string;
  groups: Group[] = [];
  Objgroup = new Group();
  sum: number = 0; //variable que se utiliza para contabilizar el total de columnas que tiene la tabla
                   //para utilizar en las busquedas.
  
  //Variables utilizadas para mostrar la ventana modal, isConfirm=true (Muestra 2 botones Aceptar, Cancelar),
  //isConfirm=false (Muestra solo un botón Aceptar), messageModal (Mensaje que muestra la ventana Modal),
  //includeText (Se utiliza para mostrar un textArea o no)
  showDialog: boolean;
  isConfirm: boolean = false;
  messageModal: string;
  includeText: boolean;

  constructor(private _service: GroupService, private _router: Router ) { 
  }

  ngOnInit() {  
    try
    { 
    this.bindTable();
    this.sum = this.getTotalCols(); //asignar a variable "sum" el valor del número total de columnas en la tabla
    this.includeText = false;
    }
    catch(e){this.errorMessage="An error occurred while loading the group list";}
  }

  bindTable() { //// Bind groups Grid
    try
    {
    this._service.getAll().subscribe(
      groups => { this.groups = groups;
  },
      error => this.errorMessage = "An error occurred while performing the search"
    );
  }
  catch(e){throw e;}
  }

  confirmDelete() {
      
      try
      {
           this.showDialog = false; /// Close dialog
           this._service.delete(this.Objgroup.id)
             .then(res => {
               if(res.status == 202)
               {
                  this.isConfirm = false;
                  this.messageModal = "Your record was successfully deleted!"
                  this.showDialog = true;
                  let index = this.groups.indexOf(this.Objgroup);
                  this.groups.splice(index, 1);   
               }
               else
               {
                  this.isConfirm = false;
                  console.log(res);
                  if (res.error){
                    this.messageModal = res.error;
                  }
                  else
                  {
                    this.messageModal = "An error occurred while deleting the registry"
                  }
                  this.showDialog = true;
               }
             },
                error =>  this.errorMessage = "An error occurred while deleting the registry");
      }
      catch(e){this.errorMessage="An error occurred while deleting the registry";}
    }

    getTotalCols(){
      try
      {
      var table = document.getElementById("myTable");
      var trs = document.getElementsByTagName("tr");
      var trFirst = trs[0];
      var tds = trFirst.getElementsByTagName('th');
      for(var i=0;i<tds.length;i++){
          this.sum = this.sum + 1;
      }
      return this.sum - 2; //se resta 2 para no tomar en cuenta las ultimas 2 columnas de la tabla (botón editar y eliminar)
      }
      catch(e){throw e;}
    }

    FilterData() {
    // Declare variables 
      var input, filter, table, tr, td, i, j;
      
      try
      {
      input = document.getElementById("myInput");
      filter = input.value.toUpperCase();
      table = document.getElementById("myTable");
      tr = table.getElementsByTagName("tr");

    // Loop through all table rows and columns, and hide those who don't match the search query
      for (i = 0; i < tr.length; i++) {
        for(j = 0; j< this.sum; j++)
        {
        td = tr[i].getElementsByTagName("td")[j];
          if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {            
               tr[i].style.display = "";
               break;
            }
            else {
              tr[i].style.display = "none";
            }
          }

        }
      }
    }
    catch(e){this.errorMessage="An error occurred while performing the search";}
    }

}
