import { Component, OnInit } from '@angular/core';

import { HealthProfile } from 'app/core/models/health-profile';
@Component({
  selector: 'app-health-profile',
  templateUrl: './health-profile.component.html',
  styleUrls: ['./health-profile.component.sass']
})
export class HealthProfileComponent implements OnInit {

  errorMessage : string;
  healthStates : string[] = ["Good", "Allergy", "Asthma"];
  allergySymptoms : string[] = ["nasal congestion", 
                                "sinus pressure, which may cause facial pain", 
                                "runny nose",
                                "itchy, watery eyes",
                                "scratchy throat",
                                "cough",
                                "swollen, bluish-colored skin beneath the eyes",
                                "decreased sense of taste or smell",
                                "increased asthmatic reaction",
                                "conjunctivitis",
                                "pruritus",
                                "peratoconjunctivitis"
                                ];
  healthProfile : HealthProfile;

  constructor() { 
    this.healthProfile = new HealthProfile();
    this.healthProfile.healthState = "Asthma";
    this.healthProfile.allergySymptoms =  [ "scratchy throat",
                                            "cough",
                                            "swollen, bluish-colored skin beneath the eyes",
                                            "decreased sense of taste or smell"];
    this.healthProfile.asthmaLevel = 2;
  }

  ngOnInit() {

  }

}
