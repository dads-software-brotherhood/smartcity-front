import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';

import { AgencyService } from '../../../../../../core/services/public-transport/agency.service';
import { TransportScheduleService } from '../../../../../../core/services/public-transport/transport-schedule.service';

import { Paginable } from '../../../../../../core/common/paginable';
import { Agency } from '../../../../../../core/models/agency';
import { Time } from '../../../../../../core/models/time';
import { TransportSchedule } from '../../../../../../core/models/transport-schedule';

@Component({
  selector: 'app-search-schedule',
  templateUrl: './search-schedule.component.html',
  styleUrls: ['./search-schedule.component.sass']
})
export class SearchScheduleComponent implements OnInit {

  schedules: Array<TransportSchedule>;
  agencies: Array<Agency>;

  routeName: string;
  frequency: Time;
  idAgency: string;
  paginable: Paginable;

  showDialog = false;
  messageModal: string = null;

  constructor(private transportScheduleService: TransportScheduleService, private agencyService: AgencyService) {
    this.reset();
  }

  private reset() {
    this.routeName = null;
    this.frequency = null;
    this.idAgency = '-1';
    this.paginable = new Paginable();
    this.paginable.number = 0;
  }

  ngOnInit() {
    try {
      this.agencyService.getAll().subscribe(
        agencies => this.agencies = agencies
      );
    } catch (e) {
      this.agencies = [];
      console.error('Error at load agency');
      console.error(e);
    }

    this.defaultLoad(false);
  }

  defaultLoad(showDialog: boolean) {
    try {
      let id;

      if (this.idAgency === '-1') {
        id = null;
      } else {
        id = this.idAgency;
      }

      this.transportScheduleService.findByQueries(this.routeName, this.frequency, id, this.paginable.number).subscribe(
        paginable => {
          this.paginable = paginable;
          this.schedules = paginable.content;

          if (showDialog && this.paginable.totalElements === 0) {
            this.showMessage('Information not found');
          }
        }
      );
    } catch (e) {
      this.schedules = [];
      console.error('Error at load schedules');
      console.error(e);
    }
  }

  onReset() {
    this.reset();
    this.defaultLoad(false);
  }

  performSearch() {
    if (this.routeName || this.frequency || this.idAgency !== '-1') {
      this.defaultLoad(true);
    } else {
      this.defaultLoad(false);
    }
  }

  private showMessage(message: string) {
    this.messageModal = message;
    this.showDialog = true;
  }

}
