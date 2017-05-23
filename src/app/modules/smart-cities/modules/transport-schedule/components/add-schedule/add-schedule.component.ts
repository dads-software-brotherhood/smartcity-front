import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { AgencyService } from '../../../../../../core/services/public-transport/agency.service';

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

  transportSchedule: TransportSchedule;

  constructor(private agencyService: AgencyService) {
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

  }

  private generateWeekDay(dayName: DayName): WeekDay {
    const tmp = new WeekDay();
    tmp.dayName = dayName;
    return tmp;
  }

  ngOnInit() {
    try {
      this.agencyService.getAll().subscribe(
        agencies => {
          console.log(agencies);
          this.agencies = agencies;
        }
      );
    } catch (e) {
      this.agencies = [];
      console.error('Error at load agencies');
      console.error(e);
    }
  }

}
