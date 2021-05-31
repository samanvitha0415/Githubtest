import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, PluginServiceGlobalRegistrationAndOptions, Color } from 'ng2-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-track-summary',
  templateUrl: './track-summary.component.html',
  styleUrls: ['./track-summary.component.scss']
})
export class TrackSummaryComponent implements OnInit, OnChanges {

  @Input() data: any;

  public doughnutChartLabels: Label[] = ['Draft', 'In Progress', 'Approved'];
  public draftCount = 0;
  public inProgressCount = 0;
  public approvedCount = 0;
  public doughnutChartData: MultiDataSet = [[this.draftCount, this.inProgressCount, this.approvedCount]];
  public tracks = [];

  public colors: Color[] = [
    {
      backgroundColor: [
        '#3A4E8A',
        '#F29E3A',
        '#75B78C'
      ]
    }
  ];
  public doughnutChartOptions: any = {
    cutoutPercentage: 80, responsive: true, aspectRation: 1, maintainAspectRatio: false,
    legend: { display: false }
  }
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartPlugins: PluginServiceGlobalRegistrationAndOptions[] = [{
    beforeDraw(chart: any) {
      const ctx = chart.ctx;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
      const centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
      ctx.font = "30" + 'px Interstate-Regular';
      ctx.fillStyle = '#171725';
      var total = chart.data.datasets[0].data[0] + chart.data.datasets[0].data[1] + chart.data.datasets[0].data[2]
      ctx.fillText(total, centerX, centerY - 5);

      ctx.font = "16" + 'px Interstate-Regular';
      ctx.fillText('Total', centerX, centerY + 20);
    }
  }];

  constructor(public router: Router) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!!this.data && Object.keys(this.data).length != 0){
      this.data.statusSummary.forEach((summary: any) => {
        if (summary.status = "APPROVED") {
          this.approvedCount = summary.noOfTracks;
        }
        if (summary.status = "IN PROGRESS") {
          this.inProgressCount = summary.noOfTracks;
        }
        if (summary.status = "DRAFT") {
          this.draftCount = summary.noOfTracks;
        }
      });
      this.doughnutChartData = [[this.draftCount, this.inProgressCount, this.approvedCount]];
      this.tracks = this.data.recentTrackList.slice(0,4);
    }

  }

  // events
  public chartClicked(event: any): void {
    console.log(event);
  }

  public chartHovered(event: any): void {
    console.log(event);
  }


  toViewTrack(track: any) {
    this.router.navigate(['analytical/viewTrack', track.trackId]);
  }

  toTracks() {
    this.router.navigate(['analytical/tracks']);
  }

}
