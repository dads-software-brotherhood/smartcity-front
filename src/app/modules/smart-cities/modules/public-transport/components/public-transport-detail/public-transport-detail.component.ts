import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { PublicTransportFuelTypeService } from '../../../../../../core/services/public-transport/public-transport-fuel-type.service';
import { TransportScheduleService } from '../../../../../../core/services/public-transport/transport-schedule.service';
import { LoginService } from '../../../../../../core/services/login/login.service';

import { PublicTransport } from '../../../../../../core/models/public-transport';
import { PublicTransportFuelType } from '../../../../../../core/models/public-transport-fuel-type';
import { TransportSchedule } from '../../../../../../core/models/transport-schedule';

@Component({
  templateUrl: './public-transport-detail.component.html',
  styleUrls: ['./public-transport-detail.component.sass']
})
export class PublicTransportDetailComponent implements OnInit {

  dateModified;
  dateCreated;

  complexForm: FormGroup;

  fuelTypes: Array<PublicTransportFuelType>;
  schedules: Array<TransportSchedule>;

  model: any;
  searching = false;
  searchFailed = false;
  selected = false;

  publicTransport: PublicTransport;

  constructor(private publicTransportFuelTypeService: PublicTransportFuelTypeService,
      private transportScheduleService: TransportScheduleService,
      private router: Router,
      private route: ActivatedRoute, fb: FormBuilder) {

    this.publicTransport = new PublicTransport();
    this.publicTransport.transportSchedules = [];

    this.complexForm = fb.group({
      'name': [null, Validators.required],
      'description': [null, Validators.nullValidator],
      'brandName': [null, Validators.required],
      'modelName': [null, Validators.required],
      'passengersTotal': [null, Validators.nullValidator],
      'idFuelType': ['-1', CustomValidators.notEqual('-1')],
      'fuelConsumption': [null, Validators.required],
      'height': [null, Validators.required],
      'width': [null, Validators.required],
      'depth': [null, Validators.required],
      'weight': [null, Validators.required],
      'schedulesCount': [0, CustomValidators.notEqual('0')]
    });

  }

  ngOnInit() {
    try {
      this.publicTransportFuelTypeService.getAll().subscribe(
        fuelTypes => this.fuelTypes = fuelTypes
      );
    } catch (e) {
      this.fuelTypes = [];
      console.error('Error at retrieve fuel types');
      console.error(e);
    }
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => this.searching = true)
      .switchMap(term =>
        this.searchSchedule(term)
            .do(() => this.searchFailed = false)
            .catch(() => {
              this.searchFailed = true;
              return Observable.of([]);
            }))
      .do(() => this.searching = false)

  anyConversionYouWant(event: any) {
    console.log(event);
    console.log(event.target.value);
  }

  private searchSchedule(term: string) {
    this.selected = false;

    return this.transportScheduleService.findByRouteName(term)
      .map(res => {
        this.schedules = res;

        const tmp: Array<string> = [];

        for (let i = 0; i < res.length; i++) {
          tmp.push(res[i].routeName);
        }

        return tmp;
      });
  }

  onChange() {
    this.selected = true;
  }

  onAddButton() {
    this.selected = false;

    console.log(this.model);

    for (let i = 0; i < this.schedules.length; i++) {
      if (this.schedules[i].routeName === this.model) {
        console.log(this.schedules[i]);
        break;
      }
    }
  }

}
