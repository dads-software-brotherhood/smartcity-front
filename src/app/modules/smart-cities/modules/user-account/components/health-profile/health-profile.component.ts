import { Component, OnInit } from '@angular/core';
import { HealthProfileService } from 'app/core/services/user-profile/health-profile.service';
import { LoginService } from 'app/core/services/login/login.service';

import { HealthProfile } from 'app/core/models/health-profile';
@Component({
  selector: 'app-health-profile',
  templateUrl: './health-profile.component.html',
  providers: [LoginService, HealthProfileService],
  styleUrls: ['./health-profile.component.sass']
})
export class HealthProfileComponent implements OnInit {

  idUser : string;
  errorMessage : string;
  messageModal : string;
  showDialog : boolean;
  successMessage : string;
  healthStates : string[] = ["Good", "Allergy", "Asthma"];
  allergySymptoms : string[] = ["Nasal congestion", 
                                "Sinus pressure, which may cause facial pain", 
                                "Runny nose",
                                "Itchy, watery eyes",
                                "Scratchy throat",
                                "Cough",
                                "Swollen, bluish-colored skin beneath the eyes",
                                "Decreased sense of taste or smell",
                                "Increased asthmatic reaction",
                                "Conjunctivitis",
                                "Pruritus",
                                "Peratoconjunctivitis"
                                ];
  healthProfile : HealthProfile;

  constructor(private healthProfileService :HealthProfileService, private loginService: LoginService) { 

    this.healthProfile = new HealthProfile();
    this.healthProfile.healthState = "Good";

    this.idUser = this.loginService.getLoggedUser().id
    this.healthProfileService.loadById(this.idUser) 
            .then(healthProfile => {
                if (healthProfile.healthState != undefined )
                  {
                    this.healthProfile = healthProfile;
                    if (this.healthProfile.healthState == "Allergy")
                    {
                      this.fillChecks();
                    }
                  }
                }
            );
    
  }

  ngOnInit() {
    
  }

  fillChecks() {
    $('input:checkbox.symptom').prop('checked', false);
    if(this.healthProfile.allergySymptoms != null)
    {
      this.healthProfile.allergySymptoms.forEach(function(symp) {
        $('input[value="' + symp + '"]:checkbox.symptom').prop('checked', true);
      });
    }
  }

  save(){
    this.errorMessage = null;
    this.messageModal = null;
    let valido = true;

    if (this.healthProfile.healthState == "Good")
    {
      this.healthProfile.allergySymptoms = null;
      this.healthProfile.asthmaLevel = null;
    }
    else if (this.healthProfile.healthState == "Allergy")
    {
      this.healthProfile.asthmaLevel = null;
      var selectedSymptoms = [];
       $('input:checkbox:checked.symptom').map(function () {
          selectedSymptoms.push(this.value)
        });
      if (selectedSymptoms.length == 0)
      {
        this.errorMessage = "You must select at least one symptom!!";
        valido = false;
      }
      else
      {
        this.healthProfile.allergySymptoms = selectedSymptoms;
      }
    }
    else if (this.healthProfile.healthState == "Asthma")
    {
      this.healthProfile.allergySymptoms = null;
      if (!this.healthProfile.asthmaLevel)
      {
        this.errorMessage = "You must select the asthma level!!";
        valido = false;
      }
    }
    else
    {
      this.errorMessage = "No valid data!!" 
      valido = false;
    }

    if (valido)
    {
      this.healthProfileService.insert(this.idUser,this.healthProfile) 
            .then(healthProfile => {
                if (healthProfile.healthState != undefined )
                  {
                    console.log("saved");
                    this.messageModal = "The information was successfully saved!!";
                    this.showDialog = true;
                    this.fillChecks();
                  }
                }
            );

    }

  }

  private enableSave()
  {
    return !(this.healthProfile.healthState == "Good" || 
            (this.healthProfile.healthState == "Allergy" && $('input:checkbox:checked.symptom').length > 0) ||
            (this.healthProfile.healthState == "Asthma" && this.healthProfile.asthmaLevel) 
            );
  }

}
