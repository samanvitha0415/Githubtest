import { Component, OnInit } from '@angular/core';
import { CreateTrackService } from '../../services/create-track/create-track.service';

@Component({
  selector: 'app-create-details.component',
  templateUrl: './create-details.component.html',
  styleUrls: ['./create-details.component.scss']
})
export class CreateDetailsComponent implements OnInit {
   editTrack = false;
  all: any;
  checked: boolean[] = [];
  isTrackValidated = false;
  errorMessages : Map<string, string> = new Map<string, string>();
  programDataSets: Map<string, string[]> = new Map<string, string[]>();
  

  constructor(public createTrackService: CreateTrackService) {
    this.programDataSets = this.createTrackService.getProgramDatasetSelected();
   }

  ngOnInit(): void {
  }

  add() {
    this.createTrackService.campaignBudget = this.createTrackService.campaignBudget + 1;
  }

  minus() {
    this.createTrackService.campaignBudget = this.createTrackService.campaignBudget - 1;
  }

  setAll(completed: boolean) {
    this.createTrackService.cannibalizationRules.map(e => {
      e.checked = completed;
    });
  }

  updateAllComplete() {
    this.all = false;
    this.createTrackService.cannibalizationRules.forEach(e => {
      if(e.checked)
        this.all = true;
    });
  }

  nextBtnClickedEvent() {
    this.validateCreateTrackDetails();
  }

  validateCreateTrackDetails() {
    this.errorMessages.clear();
    let allCheckedCount = 0;
    let cannibalizatioValueIsZeroCount = 0;

    if (this.createTrackService.campaignBudget == 0) {
      this.errorMessages.set('campaignBudget', 'Campaign Budget Shouldnt be 0');
    }

    this.createTrackService.cannibalizationRules.forEach(rule => {
      if (rule.checked) {
        allCheckedCount++;
      }
      if (rule.checked && rule.cannibalizationValue == 0) {
        cannibalizatioValueIsZeroCount++;
      }
    });

    if (allCheckedCount == 0) {
      this.errorMessages.set('cannibalizationRule', 'Atleast One Cannibalization Should Be Selected');
    }
    if (cannibalizatioValueIsZeroCount > 0) {
      this.errorMessages.set('cannibalizationValue', 'Cannibalization Value Shouldn`t be 0');
    }
    
    if (this.errorMessages.size == 0) {
      this.createTrackService.setIsTrackValidated(true);
    } else {
      this.createTrackService.setIsTrackValidated(false);
    }
  }

}

