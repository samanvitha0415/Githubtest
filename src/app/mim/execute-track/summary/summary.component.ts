import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExecuteTrackService } from '../../services/execute-track/execute-track.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public allScenarios:any;
  public allScenariosFull:any;
  public trackID: string = "";
  public newBudget: number = 0;
  public trackData:any;

  constructor(public router: Router, public route: ActivatedRoute,  private executeTrackService:  ExecuteTrackService) { }

  ngOnInit(): void {
    this.trackData = this.executeTrackService.trackData;
    this.allScenarios = this.executeTrackService.selectedScenarios;
    this.allScenariosFull = this.executeTrackService.selectedScenariosFull;
    this.trackID = this.executeTrackService.trackID;
    this.newBudget = this.executeTrackService.newBudget;

  }

  discard() {
    this.router.navigate(['../../tracks'], { relativeTo: this.route });
  }

}
