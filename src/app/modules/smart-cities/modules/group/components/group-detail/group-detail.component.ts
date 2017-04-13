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

@Component({
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.sass']
})

export class GroupDetailComponent implements OnInit {
  public groupForm: FormGroup;
  public groupId: string;
  public title: string;
  private groupTypes: any[];
  private allNotificationTypes: NotificationType[];
  private errorMessage: string;
  private successMessage: string;
  private group = new Group();

  showDialog: boolean;
  isConfirm: boolean;
  messageModal: string;
  includeText: boolean;

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
    catch (e) { this.errorMessage = "Error occurred while loading group data" }
  }

  private sub: any;

  ngOnInit() {
    try {
      this.isConfirm = false;
      this.includeText = false;
      this.sub = this.route.params.subscribe(params => {
        this.groupId = params["id"];
      })

      if (this.groupId != "") { //// Based on id decide Title add/edit
        this.title = "Edit User Group"
        this.getGroupData();
      }
      else {
        this.title = "Add User Group"
        this.getAllNotificationTypes();
      }
    }
    catch (e) { this.errorMessage = "Error occurred while loading group data" }
  }

  getGroupData() {
    try {
      this._service.loadById(this.groupId).then(
        group => {
          this.group = group;
          this.getAllNotificationTypes()
        },
        error => this.errorMessage = <any>error
      );
    }
    catch (e) { throw e; }
  }

  fillChecks() {
    $('input:checkbox.notification').prop('checked', false);
    console.log(this.group.notificationIds);
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
        error => this.errorMessage = <any>error
      );
    }
    catch (e) {
      throw e;
    }
  }





  save() {
    this.errorMessage = null;
    this.successMessage = null;
    var valido = false;
    console.log("Save");
    try {
      var selectedNotifications = [];
      $('input:checkbox:checked.notification').map(function () {
        selectedNotifications.push(this.value)
      });
      if (this.group.group.trim() != "" && selectedNotifications.length > 0) {
        this.group.notificationIds = selectedNotifications;
        if (this.groupId == "") {
          this._service.insert(this.group).then(form => {
            console.log(form);
            if (form.notificationIds != undefined) {
              this.group = form;
              this.successMessage = "Your record was successfully registered!";
            }

          },
            error => this.errorMessage = <any>error);

        }
        else {
          this._service.update(this.group).then(form => {
            if (form) {
              this.successMessage = "Your record was successfully registered!";
            }

          },
            error => this.errorMessage = <any>error);
        }

      }
      else if (!valido) {
        this.errorMessage = "Fill the group name field and select at least one notification";
      }

    }
    catch (e)
    { this.errorMessage = "Error occurred while saving group data"; }
  }

  onConfirm() {
    this.router.navigate(["/smart-cities/group/groups"]);
  }

}