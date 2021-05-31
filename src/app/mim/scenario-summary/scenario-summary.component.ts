import { Component, EventEmitter, OnInit, Input, Output, SimpleChanges } from "@angular/core";

interface campaignDataset {
  "datasetName": string;
  "sampleSize": string;
}

@Component({
  selector: 'app-scenario-summary',
  templateUrl: './scenario-summary.component.html',
  styleUrls: ['./scenario-summary.component.scss']
})
export class ScenarioSummaryComponent implements OnInit {

  @Input() trackData: any;
  @Input() selectedTrackScenario: any;
  @Output() closeViewScenario = new EventEmitter();
  campaignDataSetSampleSize: campaignDataset[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  closeViewSummary() {
    this.closeViewScenario.emit(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    // let trackDataChange = changes['trackData'];
    // let selectedTrackScenarioChange = changes['selectedTrackScenario'];
    // this.trackData = trackDataChange.currentValue;
    // this.selectedTrackScenario = selectedTrackScenarioChange.currentValue;

    // this.campaignDataSetSampleSize = Array.prototype.map.call(this.trackData.campaignDataset, s => {
    //   return s.sampleSize + "%";
    // }).toString();

    this.campaignDataSetSampleSize = [];
    this.trackData.campaignDataset && this.trackData.campaignDataset.forEach((campain: campaignDataset) => {
      this.campaignDataSetSampleSize.push(
        {
          "datasetName": campain.datasetName,
          "sampleSize": campain.sampleSize + "%"
        }
      )
    });
  }
}