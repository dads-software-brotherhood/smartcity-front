import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { Alert } from '../../../../../../core/models/alert';
import { NotificationType } from '../../../../../../core/models/notification-type';
import { AlertService } from '../../../../../../core/services/alert/alert.service';
import { LoginService } from '../../../../../../core/services/login/login.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { EnumEx } from '../../../../../../core/models/EnumEx';
import { NotificationTypeService } from '../../../../../../core/services/notification-type/notification-type.service';
import { Paginable } from '../../../../../../core/common/paginable';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'notification-user-tray',
  templateUrl: './notification-user-tray.component.html',
  styleUrls: ['./notification-user-tray.component.sass'],

})
export class NotificationUserTrayComponent implements OnInit {

  // Variables utilizadas para mostrar la ventana modal, isConfirm=true (Muestra 2 botones Aceptar, Cancelar),
  // isConfirm=false (Muestra solo un botón Aceptar), messageModal (Mensaje que muestra la ventana Modal),
  // includeText (Se utiliza para mostrar un textArea o no)
  private showDialog: boolean;
  private isConfirm: boolean;
  private messageModal: string;
  private includeText: boolean;
  private alerts: Alert[] = [];
  // private alertsAux: Alert[] = [];
  private objNotification: NotificationType;
  private notifications: NotificationType[] = [];
  private subNotifications: any[] = [];
  private page: number;
  private total: number;
  private element: any;
  private isAll: boolean;
  private isSearch: boolean;
  private param: string;
  private instance: Paginable;

  notificationId: string;
  subNotificationId: string;
  dateId: string;
  Form: FormGroup;

  initPage: string;
  initSize: string;
  initValue: string;

  constructor(private _service: AlertService, private _loginService: LoginService,
    private _router: Router, private _notificationService: NotificationTypeService,
    private fb: FormBuilder, private route: ActivatedRoute) {
    this.initPage = '0';
    this.initSize = '10';
    this.initValue = '-1';
  }

  private prepareForm() {
    this.Form = this.fb.group({
      'notificationType': this.buildFormControl(this.notificationId),
      'subNotification': this.buildFormControl(this.subNotificationId),
      'alertDate': this.buildFormControl(this.dateId)
    });
  }

  private buildFormControl(value?: any): FormControl {
    return new FormControl(value);
  }

  ngOnInit() {
    try {
      this.route.params.subscribe(params => { this.param = params['id']; });
      this.element = document.getElementById('subNotification');
      this.element = (<HTMLSelectElement>this.element);
      // this.bindTableAux(this.initPage, this.initSize);
      this.getNotification();
      this.setPage(this.param);
      this.isConfirm = true;
      this.messageModal = '';
      this.includeText = false;
    } catch (e) {
      this.setValuesModal(this.messageModal, true, false);
    }
  }

  // bindTableAux(page: string, size: string) {
  //   try {
  //     this._service.getAllByUser(page, size).subscribe(
  //       (res) => {
  //         this.instance = new Paginable().deserialize(res);
  //         this.alertsAux = this.instance.content;
  //         // console.log(this.alertsAux);
  //         this.getNotification();
  //       },
  //       (error) => {
  //         this.messageModal = error;
  //       });
  //   } catch (e) {
  //     throw e;
  //   }
  // }

  setPage(id: string) {
    if (id !== '0') {
    //   this.getAlertsByUserAlertType(id, this.initPage, this.initSize);
    //   this.notificationId = id;
    //   // this.objNotification = new NotificationType();
    //   // for (let i = 0; i < this.notifications.length; i++) {
    //   //   if (this.notifications[i].id === id) {
    //   //     this.objNotification = this.notifications[i];
    //   //     break;
    //   //   }
    //   // }
    //   // this.subNotifications = this.objNotification.subnotifications;
        this.isAll = false;
        this.isSearch = true;
    } else {
          this.isAll = true;
          this.isSearch = false;
    }
    this.bindTable(this.initPage, this.initSize);
    this.notificationId = this.initValue;
    this.subNotificationId = this.initValue;
    this.dateId = '';
    if (this.element != null) {
      this.element.disabled = true;
    }
    this.prepareForm();
  }

  // Metodo que se utiliza para el llenado de la tabla con los datos de todas las alertas
  // registradas.
  bindTable(page: string, size: string) {
    try {
      this._service.getAllEventsByUserAlert(page, size).subscribe(
        (res) => {
          this.instance = new Paginable().deserialize(res);
          this.alerts = this.instance.content;
          this.total = this.instance.totalElements;
        },
        (error) => {
          this.messageModal = error;
        });
    } catch (e) {
      throw e;
    }
  }

  // Metodo que se utiliza para el llenado de la tabla con los datos de todas las alertas
  // registradas por tipo de alerta
  getAlertsByUserAlertType(type: string, page: string, size: string) {
    try {
      this._service.getAllEventsByUserTypeAlert(type, page, size).subscribe(
        (res) => {
          this.instance = new Paginable().deserialize(res);
          this.alerts = this.instance.content;
          this.total = this.instance.totalElements;
        },
        (error) => {
          this.messageModal = error;
        });
    } catch (e) {
      throw e;
    }
  }

  // Metodo que se utiliza para el llenado de la tabla con los datos de todas las alertas
  // registradas por tipo de alerta y sub-tipo de alerta
  getAlertsByUserAlertAndEvent(type: string, subType: string, page: string, size: string) {
    try {
      this._service.getAllEventsByUserTypeSubTypeAlert(type, subType, page, size).subscribe(
        (res) => {
          this.instance = new Paginable().deserialize(res);
          this.alerts = this.instance.content;
          this.total = this.instance.totalElements;
        },
        (error) => {
          this.messageModal = error;
        });
    } catch (e) {
      throw e;
    }
  }

  // Metodo que se utiliza para el llenado de la tabla con los datos de todas las alertas
  // registradas por tipo de alerta, sub-tipo de alerta y fecha
  getAlertsByuserAlertSubAlertDate(type: string, subType: string, date: string, page: string, size: string) {
    try {
      this._service.getAllEventsByUserDateTypeSubTypeAlert(type, subType, date, page, size).subscribe(
        (res) => {
          this.instance = new Paginable().deserialize(res);
          this.alerts = this.instance.content;
          this.total = this.instance.totalElements;
        },
        (error) => {
          this.messageModal = error;
        });
    } catch (e) {
      throw e;
    }
  }

  // Metodo que se utiliza para el llenado de la tabla con los datos de todas las alertas
  // registradas por tipo de alerta y fecha
  getAlertsByUserAlertDate(type: string, date: string, page: string, size: string) {
    try {
      this._service.getAllEventsByUserDateTypeAlert(type, date, page, size).subscribe(
        (res) => {
          this.instance = new Paginable().deserialize(res);
          this.alerts = this.instance.content;
          this.total = this.instance.totalElements;
        },
        (error) => {
          this.messageModal = error;
        });
    } catch (e) {
      throw e;
    }
  }

  // Metodo que se utiliza para el llenado de la tabla con los datos de todas las alertas
  // registradas por fecha
  getAlertsByDate(date: string, page: string, size: string) {
    try {
      this._service.getAllEventsByUserDateAlert(date, page, size).subscribe(
        (res) => {
          this.instance = new Paginable().deserialize(res);
          this.alerts = this.instance.content;
          this.total = this.instance.totalElements;
        },
        (error) => {
          this.messageModal = error;
        });
    } catch (e) {
      throw e;
    }
  }


  // Metodo que se utiliza para llenar el combo de Tipos de Alerta
  getNotification() {
    try {
      if  (this.notifications.length > 0) {
                this.notifications = [];
            }
      const identityUser = this._loginService.getLoggedUser();
            this._notificationService.loadNotificationByUserId(identityUser.id).subscribe(
                (res) => {
        //   // this.notifications = res;
        //   if (this.alertsAux.length > 0) {
        //     for (let i = 0; i < res.length; i++) {
        //       for (let j = 0; j < this.alertsAux.length; j++) {
        //         if (res[i].id === this.alertsAux[j].alertType) {
        //           this.notifications.push(res[i]);
        //           break;
        //         }
        //       }
        //     }
        //   }
        //   this.alertsAux = [];
        this.notifications = res;
         },
        (error) => {
          this.messageModal = error;
        });
    } catch (e) { throw e; }
  }

  // Evento que se lanza cuando se cambia de pagina en el paginador
  pageChanged(page: number) {
    let pagina: string;

    pagina = (page - 1).toString();
    this.page = page;
    if (this.notificationId !== this.initValue
      && this.subNotificationId === this.initValue && this.dateId === '') {
      this.getAlertsByUserAlertType(this.notificationId, pagina, this.initSize);
    } else if (this.notificationId !== this.initValue
      && this.subNotificationId !== this.initValue && this.dateId === '') {
      this.getAlertsByUserAlertAndEvent(this.notificationId, this.subNotificationId, pagina, this.initSize);
    } else if (this.notificationId !== this.initValue
      && this.subNotificationId !== this.initValue && this.dateId !== '') {
      this.getAlertsByuserAlertSubAlertDate(this.notificationId, this.subNotificationId,
        this.dateId, pagina, this.initSize);
    } else if (this.notificationId !== this.initValue
      && this.subNotificationId === this.initValue && this.dateId !== '') {
      this.getAlertsByUserAlertDate(this.notificationId, this.dateId, pagina, this.initSize);
    } else if (this.notificationId === this.initValue
      && this.subNotificationId === this.initValue && this.dateId !== '') {
      this.getAlertsByDate(this.dateId, pagina, this.initSize);
    } else {
      this.bindTable(pagina, this.initSize);
    }
  }

  // Evento que se lanza cuando se cambia de elemento en el combo de Tipo de Alerta
  onNotificationTypeChange(val) {
    try {
      this.objNotification = new NotificationType();
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].id === val) {
          this.objNotification = this.notifications[i];
          break;
        }
      }
      this.subNotifications = this.objNotification.subnotifications;
      this.notificationId = val;
      this.subNotificationId = this.initValue;
      if (this.element != null) {
        if (val !== this.initValue) {
          this.element.disabled = false;
        } else {
          this.element.disabled = true;
          this.isAll = true;
          this.dateId = '';
          this.isSearch = false;
        }
      }
      this.prepareForm();
    } catch (e) {
      this.setValuesModal('An error occurred while search Subtype alert', true, false);
    }
  }

  // Evento que se lanza cuando se cambia de elemento en el combo de Sub-Tipo de Alerta
  onSubNotificationChange(val) {
    try {
      this.subNotificationId = val;
    } catch (e) {
      this.setValuesModal('An error occurred while search Subtype alert', true, false);
    }
  }

  onChangeDate(val) {
    try {
      this.dateId = val;
    } catch (e) {
      this.setValuesModal('An error occurred while search Subtype alert', true, false);
    }
  }

  // Metodo que se llama cuando se confirma la eliminación del registro
  confirmDelete() {
    try {
      if (this.isConfirm) {
      } else {
        this.showDialog = false;
      }
    } catch (e) { throw e; }
  }

  // Evento que se lanza cuando se reestablecen los criterios de busqueda con el botón clear
  OnClear() {
    let inputDate;
    try {
      inputDate = <HTMLInputElement>document.getElementById('alertDate');
      inputDate.value = '';
      inputDate.placeholder = 'yyyy-mm-dd';
      this.notificationId = this.initValue;
      this.subNotificationId = this.initValue;
      this.dateId = '';
      this.prepareForm();
      this.element.disabled = true;
      this.isAll = true;
      this.isSearch = false;
      this.bindTable(this.initPage, this.initSize);
    } catch (e) {
      this.setValuesModal('An error occurred while clearing the search controls', true, false);
    }
  }

  // Evento que se lanza cuando se realiza una busqueda con el botón search
  onSearch() {
    try {
      if (this.notificationId !== this.initValue || this.dateId !== '') {
         this.isAll = false;
         this.isSearch = true;
      } else {
         this.isAll = true;
         this.isSearch = false;
      }

      if (this.notificationId !== this.initValue && this.subNotificationId === this.initValue
        && this.dateId === '') {
        this.getAlertsByUserAlertType(this.notificationId, this.initPage, this.initSize);
      } else if (this.notificationId !== this.initValue && this.subNotificationId !== this.initValue
        && this.dateId === '') {
        this.getAlertsByUserAlertAndEvent(this.notificationId, this.subNotificationId, this.initPage, this.initSize);
      } else if (this.notificationId !== this.initValue && this.subNotificationId !== this.initValue
        && this.dateId !== '') {
        this.getAlertsByuserAlertSubAlertDate(this.notificationId, this.subNotificationId,
          this.dateId, this.initPage, this.initSize);
      } else if (this.notificationId !== this.initValue
        && this.subNotificationId === this.initValue && this.dateId !== '') {
        this.getAlertsByUserAlertDate(this.notificationId, this.dateId, this.initPage, this.initSize);
      } else if (this.notificationId === this.initValue
                && this.subNotificationId === this.initValue && this.dateId !== '') {
                  console.log('entra');
      this.getAlertsByDate(this.dateId, this.initPage, this.initSize);
      } else {
        this.bindTable(this.initPage, this.initSize);
      }
    } catch (e) {
      this.setValuesModal('An error occurred while searching data', true, false);
    }
  }

  setValuesModal(message: string, show: boolean, confirm: boolean) {
    this.isConfirm = confirm;
    this.messageModal = message;
    this.showDialog = show;
  }

}
