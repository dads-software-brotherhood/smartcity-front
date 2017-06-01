import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FuelType } from '../../../../../../core/models/fuel-type';
import { Group } from '../../../../../../core/models/group';
import { NotificationType } from '../../../../../../core/models/notification-type';
import { EnumEx } from '../../../../../../core/models/EnumEx';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { GroupService } from '../../../../../../core/services/group/group.service';
import { NotificationTypeService } from '../../../../../../core/services/notification-type/notification-type.service';
import {NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.sass']
})

export class GroupDetailComponent implements OnInit {
  public groupForm: FormGroup;
  public groupId: number;
  public title: string;
  private groupTypes: any[];
  private allNotificationTypes: NotificationType[];
  private group = new Group();
  errorMessage: string;
  showDialog: boolean;
  redirectToGropTray: boolean;
  messageModal: string;
  includeText: boolean;
  hasChecked: boolean = false;


  constructor(private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _service: GroupService,
    private _serviceNotificationType: NotificationTypeService
  ) {
    try {

      
      this.groupForm = fb.group({ //// Make Model driven form
        "group": [null, Validators.required]
      })
    }
    catch (e) { 
      this.messageModal = "Error occurred while loading group data";
      this.showDialog = true;
   }
  }

  private sub: any;

  ngOnInit() {
    try {
      this.includeText = false;
      this.sub = this.route.params.subscribe(params => {
        this.groupId = params["id"];
      })

      if (this.groupId != 0) { //// Based on id decide Title add/edit
        this.title = "Edit Group"
        this.getGroupData();
      }
      else {
        this.title = "Add new group"
        this.getAllNotificationTypes();
      }
    }
    catch (e) { 
      this.messageModal = "Error occurred while loading group data";
      this.showDialog = true;
    }
  }

  getGroupData() {
    try {
      this._service.loadById(this.groupId).then(
        group => {
          this.group = group;
          this.getAllNotificationTypes();
          this.hasChecked = this.group.notificationIds.length > 0;

        },
        error => {this.messageModal = <any>error; this.showDialog = true;}
      );
    }
    catch (e) { throw e; }
  }

  fillChecks() {
    $('input:checkbox.notification').prop('checked', false);
    if (this.group.notificationIds != null) {
      this.group.notificationIds.forEach(function (symp) {
        $('input[value="' + symp + '"]:checkbox.notification').prop('checked', true);
      });
    }
  }


  private getAllNotificationTypes() {
    try {
      this._serviceNotificationType.getAll().subscribe(
        notificationTypes => {
          this.allNotificationTypes = notificationTypes;
        },
        error => {this.messageModal = <any>error; this.showDialog = true;}
      );
    }
    catch (e) {
      throw e;
    }
  }





  save() {
    this.messageModal = null;
    this.errorMessage = null;
    var valido = false;
    try {
      var selectedNotifications = [];
      $('input:checkbox:checked.notification').map(function () {
        selectedNotifications.push(this.value)
      });
      if (this.group.group != null && this.group.group.trim() != "" && selectedNotifications.length > 0) {
        this.group.notificationIds = selectedNotifications;
        if (this.groupId == 0) {
          this._service.insert(this.group).then(form => {
            if (form.notificationIds != undefined) {
              this.group = form;
              this.groupId = this.group.id;
              this.messageModal = "The information was successfully saved";
              this.redirectToGropTray = true;
            }
            else
            {
              this.messageModal = form.error;
            }
            this.showDialog = true;

          },
            error => {
              this.messageModal = 'Unexpected error'; 
              this.showDialog = true;
            }
            );

        }
        else {
          this._service.update(this.group).then(form => {

            if (form.notificationIds != undefined) {
              this.messageModal = "The information was successfully saved";
              this.redirectToGropTray = true;
            }
            else
            {
              this.messageModal = form.error;
            }
            this.showDialog = true;
          },
            error => {
              console.log(error);
              this.messageModal = 'Unexpected error'; 
              this.showDialog = true;
            });
        }

      }
      else if (!valido) {
        this.errorMessage = "Fill the group name field and select at least one notification";
      }

    }
    catch (e)
    { 
      this.messageModal = "Error occurred while saving group data"; 
      this.showDialog = true;
    }
  }

  onConfirm() {
    this.router.navigate(["/smart-cities/group/groups"]);
  }

  private beforeChange(target) {

    if($(target).hasClass('show'))
    {
      $(target).removeClass('show');
    }
    else
    {
      $(target).addClass('show');
    }
  };

  private afterChange(event) {
    this.hasChecked = $('input:checkbox:checked.notification').length > 0;
  };

  private closeModal()
  {
    this.showDialog = false;
    if (this.redirectToGropTray)
    {
      this.router.navigate(['/smart-cities/group/groups']);
    }
  }

  

  private enableSave()
  {
    return !(this.group.group && this.hasChecked);
  }

}