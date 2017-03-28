import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserProfileService } from '../../../../../../core/services/user-profile/user-profile.service';

import { Country } from '../../../../../../core/models/country';
import { Region } from '../../../../../../core/models/region';
import { Locality } from '../../../../../../core/models/locality';
import { Address } from '../../../../../../core/models/address';
import { UserProfile } from '../../../../../../core/models/user-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  userProfile: UserProfile = new UserProfile();

  userProfileFormGroup: FormGroup;

  constructor(private userProfileService: UserProfileService, private fb: FormBuilder) {
    this.userProfileFormGroup = this.fb.group({
      'name': [null, Validators.required],
      'familyName': [null, Validators.required],
      'birthDate': [null, Validators.nullValidator],
      'gender': [null, Validators.nullValidator]
    });
  }

  ngOnInit() {
    console.log(2);
    try {
      this.userProfileService.getUserProfile().subscribe(
        (userProfile) => {
          if (userProfile) {
            this.userProfile = userProfile;
            
            console.log(3);
            this.userProfileFormGroup.setValue({'name': this.userProfile.name});
          } else {
            this.userProfile = new UserProfile();
          }

          console.log(userProfile);

          //   = this.fb.group({
          //   'name': [this.userProfile.name, Validators.required],
          //   'familyName': [this.userProfile.familyName, Validators.required],
          //   'birthDate': [this.userProfile.birthDate, Validators.nullValidator],
          //   'gender': [this.userProfile.gender, Validators.nullValidator]
          // });
          //
          if (!userProfile.addresses) {
            userProfile.addresses = [];
          }
        }
      );
    } catch (e) {
      console.log('Error at profile load');
      console.log(e);
    }
  }

}
