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

  address: Address;

  countries: Array<Country> = [];
  regions: Array<Region> = [];
  localities: Array<Locality> = [];

  complexForm: FormGroup;

  constructor(private userProfileService: UserProfileService,
      private countryService: CountryService,
      private regionService: RegionService,
      private localityService: LocalityService,
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder) {
    this.complexForm = fb.group({
      'countryId': [this.address.countryId, Validators.required],
      'regionId': [this.address.regionId, Validators.required],
      'localityId': [this.address.localityId, Validators.required],
      'addressType': [this.address.addressType, Validators.nullValidator],
      'street': [this.address.street, Validators.required],
      'postalCode': [this.address.postalCode, Validators.required]
    });
  }

  ngOnInit() {
    if (! this.address) {
      this.address = new Address();
    }

    this.loadCountries();
  }


  private loadCountries() {
    this.countryService.getAll().subscribe(
      (countries) => {
        this.countries = countries;

        if (!this.address.countryId && countries.length === 1) {
          this.address.countryId = countries[0].id;
        }

        if (this.address.countryId) {
          this.loadRegions();
        }
      }
    );
  }

  private loadRegions() {
    if (this.address.countryId) {
      this.regionService.getByCountryId(this.address.countryId).subscribe(
        (regions) => {
          this.regions = regions;

          if (!this.address.regionId && regions.length === 1 ) {
            this.address.regionId = regions[0].id;
          }

          if (this.address.regionId) {
            this.loadLocalities();
          }
        }
      );
    }
  }

  private loadLocalities() {
    if (this.address.regionId) {
      this.localityService.getByRegionId(this.address.regionId).subscribe(
        (localities) => {
          this.localities = localities;

          if (!this.address.localityId && localities.length === 1 ) {
            this.address.localityId = localities[0].id;
          }
        }
      );
    }
  }

  public changeCountry(value) {
    this.address.countryId = value;
    this.address.regionId = null;
    this.address.localityId = null;

    this.loadRegions();
  }

  public changeRegion(value) {
    this.address.regionId = value;
    this.address.localityId = null;

    this.loadLocalities();
  }
}
