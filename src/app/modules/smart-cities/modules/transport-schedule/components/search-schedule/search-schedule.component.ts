import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import { TransportScheduleService } from '../../../../../../core/services/public-transport/transport-schedule.service';

import { TransportSchedule } from '../../../../../../core/models/transport-schedule';

@Component({
  selector: 'app-search-schedule',
  templateUrl: './search-schedule.component.html',
  styleUrls: ['./search-schedule.component.sass']
})
export class SearchScheduleComponent implements OnInit {

  schedules: Array<TransportSchedule>;

  constructor(private transportScheduleService: TransportScheduleService) { }

  ngOnInit() {
    try {
      this.transportScheduleService.getAll().subscribe(
        schedules => this.schedules = schedules
      );
    } catch(e) {
      console.error('Error at load schedules');
      console.error(e);
    }
  }

}
