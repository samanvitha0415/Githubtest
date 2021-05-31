import { Component, OnInit } from '@angular/core';
import { CreateTrackService } from '../services/create-track/create-track.service';
import { first } from '../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-create-track',
  templateUrl: './create-track.component.html',
  styleUrls: ['./create-track.component.scss']
})
export class CreateTrackComponent implements OnInit {

  editTrack = false;
  errorMessages : Map<string, string> = new Map<string, string>();

  constructor(public createTrackService: CreateTrackService) {
    this.createTrackService.reset();
   }

  ngOnInit(): void {
    this.createTrackService.getCampaigns().pipe(first()).subscribe((campaigns:any) =>{
      this.createTrackService.campaigns = campaigns;
      console.log(campaigns);
    });
  }
  
  selectedCampaign(campaign: any){
    this.createTrackService.$selectedCampaign$.next(campaign);
    this.createTrackService.sampleSize = campaign.sampleSize;
    this.createTrackService.campaignBudget = campaign.campaignBudget;
    this.createTrackService.cannibalizationRules = [];
    campaign.cannibalizationRules.forEach((rule:any) => {
      this.createTrackService.cannibalizationRules.push({
        "cannibalizationRule": rule,
        "cannibalizationValue": 0,
        "checked": false
      })
    });
  }

  datasetChange(event: any, dataset: string, programName: string) {
    let datasets: string[] = this.createTrackService.$selectedDatasets$.value;
    if (event.checked) {
      datasets.push(dataset);
      this.createTrackService.addProgramDatasetSelected(dataset, programName);
    } else {
      const index = datasets.indexOf(dataset);
      this.createTrackService.deleteProgramDatasetSelected(dataset, programName);
      if (index > -1)
        datasets.splice(index, 1);
    }
    this.createTrackService.$selectedDatasets$.next(datasets);
  }

  programSelected(program:any, data: any) {
    let datasets: string[] = this.createTrackService.$selectedDatasets$.value;
    return program.datasets.some((e: string) => datasets.includes(e))
  }

  nextBtnClickedEvent() {
    this.validateCreateTrackDetails();
  }

  validateCreateTrackDetails() {
    this.errorMessages.clear();

    if (!this.createTrackService.trackName || this.createTrackService.trackName === 'Track Name') {
      this.errorMessages.set('trackName', 'Please Edit The Track Name');
    }

    let campaignName = this.createTrackService.$selectedCampaign$ && this.createTrackService.$selectedCampaign$.value && this.createTrackService.$selectedCampaign$.value.campaignName;
    if (!campaignName) {
      this.errorMessages.set('campaignName', 'Please Select Atleast One Campaign');
    }

    let datasets = this.createTrackService.$selectedDatasets$ && this.createTrackService.$selectedDatasets$.value;
    if (!datasets || datasets.length == 0) {
      this.errorMessages.set('dataset', 'Please Select Atleast One Program');
    }
    
    if (this.errorMessages.size == 0) {
      this.createTrackService.setIsTrackValidated(true);
    } else {
      this.createTrackService.setIsTrackValidated(false);
    }
  }

}
