import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { Alert } from '../../../../../../core/models/alert';
import { AlertService } from '../../../../../../core/services/alert/alert.service';
import { LoginService } from '../../../../../../core/services/login/login.service';

@Component({
  selector: 'user-vehicle-tray',
  templateUrl: './notification-tray.component.html',
  styleUrls: ['./notification-tray.component.sass'],

})
export class NotificationTrayComponent implements OnInit {

  //Variables utilizadas para mostrar la ventana modal, isConfirm=true (Muestra 2 botones Aceptar, Cancelar),
  //isConfirm=false (Muestra solo un botón Aceptar), messageModal (Mensaje que muestra la ventana Modal),
  //includeText (Se utiliza para mostrar un textArea o no)
  private showDialog: boolean;
  private isConfirm: boolean;
  private messageModal: string;
  private includeText: boolean;
  private alerts: Alert[] = [];
  private Objalert = new Alert();
  
  private isUser: boolean = false;

  constructor(private _service: AlertService, private _loginService: LoginService, private _router: Router ) { 
  }

  ngOnInit() {  
    try
    { 
      this.bindTable();
      this.isUser = this._loginService.isUser();
      this.isConfirm = true;
      this.messageModal = "";
      this.includeText = false;
    }
    catch(e)
    {
      this.setValuesModal("An error occurred while loading the notification list", true, false);
    }
  }
  
  //Metodo que se utiliza para el llenado de la tabla con los datos de las notificaciones
  //registradas.
  bindTable() { 
    try
    {
      this._service.getAll().subscribe(alerts => { this.alerts = alerts;
      }, error => this.messageModal = <any>error);
    }
    catch(e)
    {
      throw e;
    }
  }

  //Metodo que se llama cuando se confirma la eliminación del registro
  confirmDelete() {
    try
    {
        if(this.isConfirm)
        {
        }
        else
          this.showDialog = false;
      }
      catch(e){}
    }

    setValuesModal(message: string, show: boolean, confirm: boolean)
    {
      this.isConfirm = confirm;
      this.messageModal = message;
      this.showDialog = show;
    }

}
