import { Component, OnInit } from '@angular/core';
import { ExecuteTrackService } from '../../services/execute-track/execute-track.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  editTrack = false;
  sampleSize = 1;
  public budget = 123.45;
  public allScenarios: any;
  data1: any;
  data2: any;
  data3: any;
  data: any;

  constructor(private executeTrackService:  ExecuteTrackService) { }

  ngOnInit(): void {
    this.allScenarios = this.executeTrackService.trackData;
    this.budget = this.executeTrackService.trackData.campaignBudget;
    this.executeTrackService.newBudget = this.budget;
    
  }

  add() {
    this.budget = this.budget + 1;
    this.executeTrackService.newBudget = this.budget + 1;
  }

  minus() {
    this.budget = this.budget - 1;
    this.executeTrackService.newBudget = this.budget - 1;
  }

  setAll(completed: boolean) {
    this.data = completed;
    this.data1 = completed;
    this.data2 = completed;
    this.data3 = completed;
  }

  updateAllComplete() {
    this.data =  this.data1 || this.data2 || this.data3;
  }

}
