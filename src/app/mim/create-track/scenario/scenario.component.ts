import { Component, OnInit } from '@angular/core';
import { CreateTrackService } from '../../services/create-track/create-track.service';
import { TrackService } from '../../services/track.service';
import { ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { first } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-scenario',
  templateUrl: './scenario.component.html',
  styleUrls: ['./scenario.component.scss']
})
export class ScenarioComponent implements OnInit {
  editTrack = false;
  errorMessages: Map<string, string> = new Map<string, string>();
  decisionVariablesFileName = "";
  public track: any;

  constructor(
    public createTrackService: CreateTrackService,
    private trackService: TrackService,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.createTrackService.getDecisionVariables();

    this.activeRouter.params.pipe(first()).subscribe((params: any) => {
      if (!!params.id) {
        this.createTrackService.type = params.type;
        this.trackService.getTrack(params.id).pipe(first()).subscribe((data: any) => {
          this.track = data;
          if (params.type != "cloneTrack") {
            this.createTrackService.trackId = data.trackId;
            this.createTrackService.trackName = data.trackName;
          }
          this.createTrackService.selectedCampaignName = data.campaignName;
          this.createTrackService.$selectedDatasets$.next(data.campaignDataset);
          this.createTrackService.campaignBudget = data.campaignBudget;
          this.createTrackService.cannibalizationRules = [];
          data.campaignCannibalization.forEach((rule: any) => {
            this.createTrackService.cannibalizationRules.push({
              "cannibalizationRule": rule.cannibalizationRule,
              "cannibalizationValue": rule.cannibalizationValue,
              "checked": true
            });
          });
          this.createTrackService.decisionFileId = data.decisionFileId;
          this.createTrackService.xmlTemplateId = data.xmlTemplateId;
          this.createTrackService.getDecisionVariables();
        });
      } else {
        this.createTrackService.getDecisionVariables();
      }
    });

  }

  nextBtnClickedEvent() {
    this.validateCreateTrackDetails();
  }

  validateCreateTrackDetails() {
    this.errorMessages.clear();

    if (!this.createTrackService.scenarioName || this.createTrackService.scenarioName === 'Scenario Name') {
      this.errorMessages.set('scenarioName', 'Please Edit The Scenario Name');
    }

    if (!this.createTrackService.optimizerObjective || this.createTrackService.optimizerObjective === '') {
      this.errorMessages.set('optimizerObjective', 'Please Edit The Optimizer Objective');
    }
    if (this.errorMessages.size == 0) {
      this.createTrackService.setIsTrackValidated(true);
    } else {
      this.createTrackService.setIsTrackValidated(false);
    }
  }
}
