import { Component, OnInit } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { first } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import { CreateTrackService } from '../services/create-track.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productionTracks: any = [];
  teamTracks: any = [];
  campaignSampleDatasets: any = [];
  campaignProductionDatasets: any = [];
  recentFiles: any = [];
  summaryData: any = {};

  constructor(
    private http: HttpClient,
    private dashboardService: DashboardService,
    public createTrackService: CreateTrackService
  ) { }

  ngOnInit(): void {
    this.createTrackService.reset();
    this.dashboardService.getAnalyticalData().pipe(first()).subscribe((data: any) => {
      this.productionTracks = data.productionTracks.slice(0, 5);;
      this.teamTracks = data.teamTracks.slice(0, 4);
      data.campaignList.forEach((campaign: any) => {
        if (campaign.datasetType == "SAMPLE") {
          this.campaignSampleDatasets = campaign.datasetList;
        }
        if (campaign.datasetType == "PRODUCTION") {
          this.campaignProductionDatasets = campaign.datasetList;
        }
      });
      this.recentFiles = data.recentFiles;
      this.summaryData = data.userTracks;
    });

  }

}
