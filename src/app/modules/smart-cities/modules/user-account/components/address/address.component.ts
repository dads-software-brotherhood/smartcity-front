import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import { constants } from '../../../../../../core/common/constants';

import { CountryService } from '../../../../../../core/services/country/country.service';
import { RegionService } from '../../../../../../core/services/region/region.service';
import { LocalityService } from '../../../../../../core/services/locality/locality.service';
import { UserProfileService } from '../../../../../../core/services/user-profile/user-profile.service';

import { Country } from '../../../../../../core/models/country';
import { Region } from '../../../../../../core/models/region';
import { Locality } from '../../../../../../core/models/locality';
import { Address } from '../../../../../../core/models/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.sass']
})
export class AddressComponent implements OnInit {

  address: Address = new Address();

  index: string;

  countryId: number = -1;
  regionId: number = -1;
  localityId: number = -1;

  countries: Array<Country> = [];
  regions: Array<Region> = [];
  localities: Array<Locality> = [];

  complexForm: FormGroup;

  showDialog: boolean;
  showErrorDialog: boolean;
  messageModal: string;

  constructor(private userProfileService: UserProfileService,
      private countryService: CountryService,
      private regionService: RegionService,
      private localityService: LocalityService,
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder) {
    this.prepareComplexForm();
  }

  private prepareComplexForm() {
    this.complexForm = this.fb.group({
      'countryId': this.buildSelectRequiredFormControl(this.countryId),
      'regionId': this.buildSelectRequiredFormControl(this.regionId),
      'localityId': this.buildSelectRequiredFormControl(this.localityId),
      'favorite': this.buildSimpleFormControl(this.address.favorite),
      'addressType': this.buildSimpleFormControl(this.address.addressType),
      'street': this.buildRequiredFormControl(this.address.street),
      'postalCode': this.buildSimpleFormControl(this.address.postalCode)
    });
  }

  private buildRequiredFormControl(value?: any): FormControl {
    return new FormControl(value, Validators.required);
  }

  private buildSelectRequiredFormControl(value?: any): FormControl {
    return new FormControl(value, CustomValidators.notEqual(-1));
  }

  private buildSimpleFormControl(value?: any): FormControl {
    return new FormControl(value, []);
  }

  private buildPostalCodeFormControl(value?: any): FormControl {
    return new FormControl(value, [Validators.required, Validators.pattern(new RegExp('^[0-9]{1-5}$'))]);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = params['index'];

      if (this.index) {
        this.userProfileService.getAddress(this.index).subscribe(
          (res) => {
            this.address = res;
            this.loadAddress();
          },
          (error) => {
            console.error(error);
            this.index = null;
            this.loadAddress();
          }
        )
      } else {
        this.loadAddress();
      }
    });
  }

  private loadAddress() {
    if (! this.address) {
      this.address = new Address();
    }

    if (this.address.locality) {
      this.countryId = this.address.locality.region.country.id;
      this.regionId = this.address.locality.region.id;
      this.localityId = this.address.locality.id;
    }

    this.loadCountries();

  }

  private loadCountries() {
    this.countryService.getAll().subscribe(
      (countries) => {
        this.countries = countries;

        if (this.countryId === -1 && countries.length === 1) {
          this.countryId = countries[0].id;
        }

        if (this.countryId !== -1) {
          this.loadRegions();
        } else {
          this.prepareComplexForm();
        }
      }
    );
  }

  private loadRegions() {
    if (this.countryId !== -1) {
      this.regionService.getByCountryId(this.countryId).subscribe(
        (regions) => {
          this.regions = regions;

          if (this.regionId === -1 && regions.length === 1 ) {
            this.regionId = regions[0].id;
          }

          if (this.regionId !== -1) {
            this.loadLocalities();
          } else {
            this.prepareComplexForm();
          }
        }
      );
    }
  }

  private loadLocalities() {
    if (this.regionId !== -1) {
      this.localityService.getByRegionId(this.regionId).subscribe(
        (localities) => {
          this.localities = localities;

          if (this.localityId === -1 && localities.length === 1 ) {
            this.localityId = localities[0].id;
          }

          this.prepareComplexForm();
        }
      );
    }
  }

  public changeCountry(value) {
    this.countryId = value;
    this.regionId = -1;
    this.localityId = -1;

    this.loadRegions();
  }

  public changeRegion(value) {
    this.regionId = value;
    this.localityId = -1;

    this.loadLocalities();
  }

  public submitForm(form: any) {
    this.address.addressType = form.addressType;
    this.address.postalCode = form.postalCode;
    this.address.street = form.street;
    this.address.favorite = form.favorite;
    this.address.locality = this.findLocality(form.localityId);

    if (this.address.locality) {
      if (this.index) {
        this.address.index = this.index;

        this.userProfileService.updateAddress(this.address).subscribe(
          (res) => {
            this.allOk();
          },
          (error) => {
            this.error(error);
          }
        );

      } else {
        this.userProfileService.insertAddress(this.address).subscribe(
          (res) => {
            this.allOk();
          },
          (error) => {
            this.error(error);
          }
        );
      }
    } else {
      this.showErrorMessage('There was a communication error, please try later.');
    }
  }

  private allOk() {
    this.showMessage('The information was successfully saved');
  }

  private error(error: any) {
    console.error(error);
    this.showErrorMessage('There was a communication error, please try later.');
  }

  private findLocality(id: number): Locality {
    for (let i = 0; i < this.localities.length; i++) {
      if (this.localities[i].id === Number(id)) {
        return this.localities[i];
      }
    }

    console.log('Not found locality ID: ' + id);

    return null;
  }

  showMessage(message: string) {
    this.messageModal = message;
    this.showDialog = true;
  }

  private showErrorMessage(message: string) {
    this.messageModal = message;
    this.showErrorDialog = true;
  }

  onContinue() {
    this.router.navigate(['/smart-cities/user-account/profile']);
  }

}
