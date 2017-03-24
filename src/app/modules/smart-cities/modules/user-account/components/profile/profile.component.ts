import { Component, OnInit } from '@angular/core';

import { UserProfileService } from '../../../../../../core/services/user-profile/user-profile.service';

import { Address } from '../../../../../../core/models/address';
import { UserProfile } from '../../../../../../core/models/user-profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  userProfile: UserProfile;
  address: Address;

  constructor(private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.userProfileService.getUserProfile().subscribe(
      (userProfile) => this.userProfile = userProfile
    );
  }
}
