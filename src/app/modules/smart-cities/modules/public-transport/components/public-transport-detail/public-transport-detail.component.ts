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

import { PublicTransportService } from '../../../../../../core/services/public-transport/public-transport.service';
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

  complexForm: FormGroup;

  fuelTypes: Array<PublicTransportFuelType>;
  schedules: Array<TransportSchedule>;

  searching = false;
  searchFailed = false;

  edit: boolean;
  unSaved = false;

  publicTransport: PublicTransport;

  showDialog = false;
  showConfirmDialog = false;
  showErrorDialog = false;
  messageModal: string;

  indexDelete: number = -1;

  constructor(private loginService: LoginService,
      private publicTransportFuelTypeService: PublicTransportFuelTypeService,
      private publicTransportService: PublicTransportService,
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
      'fuelConsumption': [null, Validators.nullValidator],
      'height': [null, Validators.nullValidator],
      'width': [null, Validators.nullValidator],
      'depth': [null, Validators.nullValidator],
      'weight': [null, Validators.nullValidator],
      'model': [null, Validators.nullValidator],
      'schedulesCount': [0, CustomValidators.notEqual('0')]
    });

  }

  ngOnInit() {
    try {
      this.publicTransportFuelTypeService.getAll().subscribe(
        fuelTypes => {
          this.fuelTypes = fuelTypes;

          this.route.params.subscribe((params: Params) => {
            const id  = params['id'];

            if (id) {
              this.edit = true;

              this.publicTransportService.findById(id).subscribe(
                publicTransport => {
                  this.publicTransport = publicTransport;

                  this.complexForm.controls['name'].setValue(publicTransport.name);
                  this.complexForm.controls['description'].setValue(publicTransport.description);
                  this.complexForm.controls['brandName'].setValue(publicTransport.brandName);
                  this.complexForm.controls['modelName'].setValue(publicTransport.modelName);
                  this.complexForm.controls['passengersTotal'].setValue(publicTransport.passengersTotal);

                  if (publicTransport.fuelType) {
                    this.complexForm.controls['idFuelType'].setValue(publicTransport.fuelType.id);
                  }

                  this.complexForm.controls['fuelConsumption'].setValue(publicTransport.fuelConsumption);
                  this.complexForm.controls['height'].setValue(publicTransport.height);
                  this.complexForm.controls['width'].setValue(publicTransport.width);
                  this.complexForm.controls['depth'].setValue(publicTransport.depth);
                  this.complexForm.controls['weight'].setValue(publicTransport.weight);

                  this.fixIndex();

                  if (!this.loginService.isSA() && this.loginService.getLoggedUser().id !== this.publicTransport.creatorId) {
                    this.unSaved = true;

                    this.showErrorMessage('You can\'t edit this record');
                  }

                }
              );
            } else {
              this.edit = false;
            }

          });
        }
      );
    } catch (e) {
      this.fuelTypes = [];
      console.error('Error at load data');
      console.error(e);
    }
  }

  private fixIndex() {
    if (this.publicTransport.transportSchedules) {
      for (let i = 0; i < this.publicTransport.transportSchedules.length; i++) {
        this.publicTransport.transportSchedules[i].index = i;
      }
    }
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(300)
      .distinctUntilChanged()
      .do(() => {
        this.searching = true;
        this.searchFailed = false;
      })
      .switchMap(term =>
        this.searchSchedule(term)
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
    return this.transportScheduleService.findByRouteName(term)
      .map(res => {
        this.schedules = res;

        this.searchFailed = res.length === 0;

        const tmp: Array<string> = [];

        for (let i = 0; i < res.length; i++) {
          tmp.push(res[i].routeName);
        }

        return tmp;
      });
  }

  onAddButton() {
    const model = this.complexForm.controls['model'].value;

    if (model) {
      let transportSchedule: TransportSchedule = null;

      for (let i = 0; i < this.schedules.length; i++) {
        if (this.schedules[i].routeName === model) {
          transportSchedule = this.schedules[i];
          break;
        }
      }

      if (transportSchedule) {
        let already = false;

        for (let i = 0; i < this.publicTransport.transportSchedules.length; i++) {
          if (this.publicTransport.transportSchedules[i].id === transportSchedule.id) {
            already = true;
            break;
          }
        }

        if (!already) {
          this.publicTransport.transportSchedules.push(transportSchedule);
        } else {
          console.log('Already added');
        }
      } else {
        console.log('Transpor schedule not found');
      }
    } else {
      console.log('Model not found');
    }

    this.fixIndex();
  }

  onDeleteButton(index: number) {
    this.indexDelete = index;
    this.showConfirmMessage('Are you sure you want to delete this schedule');
  }

  onDelete() {
    if (this.indexDelete >= 0 && this.indexDelete < this.publicTransport.transportSchedules.length) {
      this.publicTransport.transportSchedules.splice(this.indexDelete, 1);
    }
    this.fixIndex();
    this.indexDelete = -1;
    this.showConfirmDialog = false;
  }

  submitForm(form: any) {
    this.publicTransport.name = form.name;
    this.publicTransport.description = form.description;
    this.publicTransport.brandName = form.brandName;
    this.publicTransport.modelName = form.modelName;
    this.publicTransport.passengersTotal = form.passengersTotal;
    this.publicTransport.fuelConsumption = form.fuelConsumption;
    this.publicTransport.height = form.height;
    this.publicTransport.width = form.width;
    this.publicTransport.depth = form.depth;
    this.publicTransport.weight = form.weight;

    const idFuelType = form.idFuelType;

    for (let i = 0; i < this.fuelTypes.length; i++) {
      if (this.fuelTypes[i].id + '' === idFuelType) {
        this.publicTransport.fuelType = this.fuelTypes[i];
        break;
      }
    }

    if (!this.publicTransport.fuelType) {
      this.showErrorMessage('Can\'t find fuel type');
      return;
    }

    try {
      if (this.publicTransport.id) {
        this.publicTransportService.update(this.publicTransport).subscribe(
          (res) => {
            this.showMessage('The information was successfully saved');
          }
        );
      } else {
        this.publicTransportService.insert(this.publicTransport).subscribe(
          (res) => {
            this.showMessage('The information was successfully saved');
          }
        );
      }
    } catch (e) {
      console.error('Error at save');
      console.error(e);
      this.showErrorMessage('There was a communication error, please try later.');
    }
  }

  onBack() {
    if (this.edit) {
      this.router.navigate(['/smart-cities/public-transport/manager']);
    } else {
      this.router.navigate(['/smart-cities']);
    }
  }

  private showMessage(message: string) {
    this.messageModal = message;
    this.showDialog = true;
  }

  private showConfirmMessage(message: string) {
    this.messageModal = message;
    this.showConfirmDialog = true;
  }

  private showErrorMessage(message: string) {
    this.messageModal = message;
    this.showErrorDialog = true;
  }
}
