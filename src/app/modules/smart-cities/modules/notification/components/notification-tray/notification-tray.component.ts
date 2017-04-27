import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router} from '@angular/router';
import { Alert } from '../../../../../../core/models/alert';
import { NotificationType } from '../../../../../../core/models/notification-type';
import { AlertService } from '../../../../../../core/services/alert/alert.service';
import { LoginService } from '../../../../../../core/services/login/login.service';
import { SubNotification } from '../../../../../../core/models/sub-notification';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { EnumEx } from '../../../../../../core/models/EnumEx';
import { NotificationTypeService } from '../../../../../../core/services/notification-type/notification-type.service';
import { SubNotificationService } from '../../../../../../core/services/sub-notification/sub-notification.service';


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
  private subNotifications: SubNotification[] = [];
  private notifications: NotificationType[] = [];
  
  private isUser: boolean = false;
  private page: number;
  private total: number;
  private element: any;
  private alertType: string;

  notificationId: number = -1;
  subNotificationId: number = -1;
  Form: FormGroup;

  constructor(private _service: AlertService, private _loginService: LoginService, 
              private _router: Router, private _notificationService: NotificationTypeService,
              private _subNotificationService: SubNotificationService, private fb: FormBuilder) { 
              this.prepareForm();
  }

  private prepareForm() {
    this.Form = this.fb.group({
      'notificationType': this.buildSelectRequiredFormControl(this.notificationId),
      'subNotification': this.buildSelectRequiredFormControl(this.subNotificationId)
    });
  }

  private buildSelectRequiredFormControl(value?: any): FormControl {
    return new FormControl(value);
  }

  ngOnInit() {  
    try
    { 
      this.total = 20;
      this.getNotification();
      this.bindTable('0', '10');
      this.isUser = this._loginService.isUser();
      this.isConfirm = true;
      this.messageModal = "";
      this.includeText = false;

      this.element = document.getElementById('subNotification');
      this.element = (<HTMLSelectElement>this.element);
      if(this.element != null)
      {
        this.element.disabled = true;
      }
    }
    catch(e)
    {
      this.setValuesModal(this.messageModal, true, false);
    }
  }
  
  //Metodo que se utiliza para el llenado de la tabla con los datos de todas las alertas
  //registradas.
  bindTable(page: string, size: string) { 
    try
    {
      this._service.getAllByPage(page, size).subscribe(
        (res) => { 
          this.alerts = res;
        },
        (error) => {
            this.messageModal = error;
        });
    }
    catch(e)
    {
      throw e;
    }
  }

   //Metodo que se utiliza para el llenado de la tabla con los datos de todas las alertas
  //registradas por tipo de alerta
   getAlertsByAlertType(type: string, page: string, size: string) { 
    try
    {
      this._service.getAllByTypeAlert(type, page, size).subscribe(
        (res) => { 
          this.alerts = res;
        },
        (error) => {
            this.messageModal = error;
        });
    }
    catch(e)
    {
      throw e;
    }
  }

  //Metodo que se utiliza para llenar el combo de Tipos de Alerta
  getNotification() {
     try
      {
        this._notificationService.getAll().subscribe(
        (res) => {
            this.notifications = res;
        },
        (error) => {
            this.messageModal = error;
        });
      }
      catch(e){ throw e;}
}

 //Metodo que se utiliza para llenar el combo de Sub-Tipos de Alerta
 getSubTypeAlert(idNotification: number) {
    try
    {
        this._subNotificationService.getByNotificationId(idNotification).subscribe(
        (res) => { 
          this.subNotifications = res;
        },
        (error) => {
            this.messageModal = error;
        });
    }
    catch(e){throw e;}
}

  //Evento que se lanza cuando se cambia de pagina en el paginador
  pageChanged(page: number)
  {
    let pagina: string;
    pagina = (page-1).toString();
    this.page = page;
    if(this.notificationId < 0 && this.subNotificationId < 0)
      this.bindTable(pagina, '10');
    else if(this.notificationId > 0 && this.subNotificationId < 0)
      this.getAlertsByAlertType(this.alertType, pagina, '10');
  }

  //Evento que se lanza cuando se cambia de elemento en el combo de Tipo de Alerta
  onNotificationTypeChange(val)
  {
     try
    {
        this.getSubTypeAlert(val);
        this.notificationId = val;
        this.subNotificationId = -1;
        this.prepareForm();
        if(this.element != null)
        {
          if(val > 0)
            this.element.disabled = false;
          else
            this.element.disabled = true;     
        }
    }
    catch(e){
      this.setValuesModal("An error occurred while search Subtype alert", true, false);
    }
  }

  //Evento que se lanza cuando se cambia de elemento en el combo de Sub-Tipo de Alerta
  onSubNotificationChange(val){
    try
    {
        this.subNotificationId = val;
    }
    catch(e){
      this.setValuesModal("An error occurred while search Subtype alert", true, false);
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
      catch(e){ throw e;}
    }

    OnClear(){
      var inputDate, selectSubNotification;
      try
      {
        selectSubNotification = <HTMLSelectElement>document.getElementById("subNotification");
        inputDate = <HTMLInputElement>document.getElementById("alertDate");
        inputDate.value = "";
        inputDate.placeholder = "yyyy-mm-dd";
        this.notificationId = -1;
        this.subNotificationId = -1;
        this.prepareForm();
        selectSubNotification.disabled = true;
      }
      catch(e){
          this.setValuesModal("An error occurred while clearing the search controls", true, false);
      }
    }

    onSearch(){     
      try
      {
        var selectNotification, selectSubNotification, index;
        selectNotification = <HTMLSelectElement>document.getElementById("notificationType");
        selectSubNotification = <HTMLSelectElement>document.getElementById("subNotification");
        if(this.notificationId > 0 && this.subNotificationId <= 0)
        {
            index = selectNotification.options.selectedIndex;
            this.alertType = selectNotification.options[index].innerText;
            this.getAlertsByAlertType(this.alertType, '0', '10');
        }
        else if(this.notificationId > 0 && this.subNotificationId > 0)
        {

        }
      }
      catch(e)
      {
        this.setValuesModal("An error occurred while searching data", true, false);
      }
    }

    setValuesModal(message: string, show: boolean, confirm: boolean)
    {
      this.isConfirm = confirm;
      this.messageModal = message;
      this.showDialog = show;
    }

}
