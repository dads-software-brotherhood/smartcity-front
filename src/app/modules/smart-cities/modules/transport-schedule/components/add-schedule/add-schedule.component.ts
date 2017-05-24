import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs/Observable';

import { AgencyService } from '../../../../../../core/services/public-transport/agency.service';
import { TransportScheduleService } from '../../../../../../core/services/public-transport/transport-schedule.service';
import { LoginService } from '../../../../../../core/services/login/login.service';

import { Agency } from '../../../../../../core/models/agency';
import { DayName } from '../../../../../../core/models/day-name';
import { Time } from '../../../../../../core/models/time';
import { TransportSchedule } from '../../../../../../core/models/transport-schedule';
import { WeekDay } from '../../../../../../core/models/week-day';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.sass']
})
export class AddScheduleComponent implements OnInit {

  agencies: Array<Agency> = [];

  agencySelected: Agency = new Agency();
  agencyValue: any = '-1';

  transportSchedule: TransportSchedule;

  complexForm: FormGroup;

  showDialog = false;
  showErrorDialog = false;
  messageModal: string = null;

  constructor(private agencyService: AgencyService, private transportScheduleService: TransportScheduleService,
      private loginService: LoginService, private fb: FormBuilder, private router: Router) {
    this.transportSchedule = new TransportSchedule();

    const weekDays = new Array<WeekDay>();

    // TODO: Change to foreach

    weekDays.push(this.generateWeekDay(DayName.MONDAY));
    weekDays.push(this.generateWeekDay(DayName.TUESDAY));
    weekDays.push(this.generateWeekDay(DayName.WEDNESDAY));
    weekDays.push(this.generateWeekDay(DayName.THURSDAY));
    weekDays.push(this.generateWeekDay(DayName.FRIDAY));
    weekDays.push(this.generateWeekDay(DayName.SATURDAY));
    weekDays.push(this.generateWeekDay(DayName.SUNDAY));

    this.transportSchedule.weekDays = weekDays;

    this.complexForm = this.fb.group({
      'routeName': new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      'frequency': new FormControl(null, [Validators.required]),
      'idAgency': new FormControl('-1', [CustomValidators.notEqual('-1')]),
    });

    for ( let weekDay of weekDays ) {
      this.complexForm.addControl(weekDay.nameAsString + '-active', new FormControl(weekDay.active, Validators.nullValidator));
      this.complexForm.addControl(weekDay.nameAsString + '-departure', new FormControl(null, Validators.required));
      this.complexForm.addControl(weekDay.nameAsString + '-arrival', new FormControl(null, Validators.required));
    }

    this.complexForm.addControl('count', new FormControl(7, CustomValidators.notEqual('0')));

  }

  private generateWeekDay(dayName: DayName): WeekDay {
    const tmp = new WeekDay();
    tmp.dayName = dayName;
    tmp.nameAsString = DayName[dayName];
    tmp.active = true;

    return tmp;
  }

  ngOnInit() {
    try {
      this.agencyService.getAll().subscribe(
        agencies => this.agencies = agencies
      );
    } catch (e) {
      this.agencies = [];
      console.error('Error at load agencies');
      console.error(e);
    }
  }

  onChangeAgency(event: any) {

    const idx: number = event.target.selectedIndex - 1;

    if (this.agencies.length >= 0 && idx < this.agencies.length) {
      this.agencySelected = this.agencies[idx];
    } else {
      this.agencySelected = new Agency();
    }
  }

  changeActive(event: any) {
    const tmp = event.target.id.split('-')[0];

    if (event.target.checked) {
      this.complexForm.controls[tmp + '-departure'].reset({ value: null, disabled: false });
      this.complexForm.controls[tmp + '-arrival'].reset({ value: null, disabled: false });
    } else {
      this.complexForm.controls[tmp + '-departure'].reset({ value: null, disabled: true });
      this.complexForm.controls[tmp + '-arrival'].reset({ value: null, disabled: true });
    }

    let count = 0;

    for ( let weekDay of this.transportSchedule.weekDays ) {
      if (this.complexForm.controls[ weekDay.nameAsString + '-active' ].value) {
        count++;
      }
    }

    this.complexForm.controls['count'].setValue(count + '');

  }

  submitForm(form: any) {
    this.transportSchedule.routeName = form.routeName;

    for ( let agency of this.agencies ) {
      if ( agency.id === form.idAgency ) {
        this.transportSchedule.agency = agency;
      }
    }

    if (this.transportSchedule.agency === null) {
      console.error('Can\'t find agency');
    }

    this.transportSchedule.frequency = form.frequency;

    for ( let weekDay of this.transportSchedule.weekDays ) {
      weekDay.active = form[weekDay.nameAsString + '-active'];
      if (weekDay.active) {
        weekDay.arrivalTime = form[weekDay.nameAsString + '-arrival'];
        weekDay.departureTime = form[weekDay.nameAsString + '-departure'];
      } else {
        weekDay.arrivalTime = null;
        weekDay.departureTime = null;
      }
    }

    try {
      if (this.transportSchedule.id) {
        this.transportScheduleService.update(this.transportSchedule).subscribe(
          (res) => {
            this.showMessage('The information was successfully saved.');
          },
          (error) => {
            console.error(error);
            this.showErrorMessage('An error occurred, try later');
          }
        );
      } else {
        this.transportScheduleService.insert(this.transportSchedule).subscribe(
          (res) => {
            this.showMessage('The information was successfully saved.');
          },
          (error) => {
            console.error(error);
            this.showErrorMessage('An error occurred, try later');
          }
        );
      }
    } catch (e) {
      console.error(e);
      this.showErrorMessage('An error occurred, try later');
    }
  }

  private showMessage(message: string) {
    this.messageModal = message;
    this.showDialog = true;
  }

  private showErrorMessage(message: string) {
    this.messageModal = message;
    this.showErrorDialog = true;
  }

  onContinue() {
    this.router.navigate(['/smart-cities/transport-schedule/search-schedule']);
  }

}
