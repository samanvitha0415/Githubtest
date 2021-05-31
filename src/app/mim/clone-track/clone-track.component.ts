import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from '../../../../node_modules/rxjs/operators';
import { CreateTrackService } from "../services/create-track/create-track.service";

import { TrackService } from "../services/track.service";

export interface ScenarioData {
  isChecked: boolean;
  scenarioId: number;
  scenarioName: string;
  scenarioStatus: string;
  optimizerObjective: string;
  lastUpdatedDate: string;
  approvalFlag: string;
  priorityOrder: number;
}


@Component({
  selector: "app-clone-track",
  templateUrl: "./clone-track.component.html",
  styleUrls: ["./clone-track.component.scss"]
})
export class CloneTrackComponent implements OnInit {
  displayedColumns: string[] = [
    "scenarioDetails",
    "status",
    "search",
    "filter"
  ];
  dataSource: ScenarioData[] = [];
  isViewScenarioDialogOpen: boolean = false;
  trackData: any;
  newTrackName: string = '';
  clonedViewTracksData: any;
  isNextBtnClicked: boolean = false;
  isBackBtnClicked: boolean = false;
  opeScenarioData: any;
  clonedScenarios: any;
  selectedScenarios: ScenarioData[] = [];
  trackId: number = 0;

  constructor(
    private trackService: TrackService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    public createTrackSerice: CreateTrackService
  ) { }

  ngOnInit(): void {
    this.activeRouter.params.pipe(first()).subscribe((params: any) => {
      this.trackId = params.id;
      if (this.trackId != 0) {
        this.getTrackByTrackId();
      }
    });
  }

  getTrackByTrackId() {
    this.trackService.getTrack(this.trackId).pipe(first()).subscribe((data: any) => {
      if (data) {
        this.trackData = data;
        this.dataSource = [];
        if (!this.isNextBtnClicked && this.isBackBtnClicked) {
          this.dataSource = [...this.selectedScenarios];
          data.scenarioList && data.scenarioList.length > 0 && data.scenarioList.forEach((scenario: any) => {
            var index = this.selectedScenarios.map(function(scenario1){
              return scenario1.scenarioId;
             }).indexOf(scenario.scenarioId);

            if (index == -1) {
              this.dataSource.push({
                isChecked: false,
                scenarioId: scenario.scenarioId,
                scenarioName: scenario.scenarioName,
                scenarioStatus: scenario.scenarioStatus,
                optimizerObjective: scenario.optimizerObjective,
                lastUpdatedDate: scenario.lastUpdatedDate,
                approvalFlag: scenario.approvalFlag,
                priorityOrder: scenario.priorityOrder
              });
            }
          });
        } else {
          this.dataSource = this.trackData.scenarioList;
        }

        this.clonedScenarios = Object.assign([], this.dataSource);
        this.newTrackName = this.trackData.trackName + " - Cloned";
        this.createTrackSerice.reset();
        console.log("Selected Scenarios: ", this.dataSource);
      }

    });
  }

  openViewTrackDailog(element: any) {
    this.opeScenarioData = element;
    this.isViewScenarioDialogOpen = true;
  }

  closeViewTrackScenario() {
    this.isViewScenarioDialogOpen = false;
  }

  goToViewTrackOnCancel() {
    this.router.navigateByUrl("/mim/viewtrack");
  }

  onNextBtnClicked() {
    this.isNextBtnClicked = true;
    this.isBackBtnClicked = false;
    this.dataSource = this.selectedScenarios;
    this.clonedScenarios = Object.assign([], this.dataSource);
  }

  onBackBtnClicked() {
    this.isNextBtnClicked = false;
    this.isBackBtnClicked = true;
    this.getTrackByTrackId();
  }

  searchTrackData(searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();
    if (searchTerm.length > 0) {
      this.dataSource = this.clonedScenarios.filter((scenario: any) => {
        return (
          scenario.scenarioName.toLowerCase().includes(searchTerm) ||
          scenario.scenarioStatus.toLowerCase().includes(searchTerm)
        );
      });
    } else {
      this.dataSource = this.clonedScenarios;
    }
  }

  filterBy(event: any) {
    const filteredscenario = event.value && event.value.toLowerCase();
    if (filteredscenario === "all") {
      this.dataSource = this.clonedScenarios;
    } else {
      this.dataSource = this.clonedScenarios.filter((scenario: any) => {
        return scenario.scenarioStatus.toLowerCase() == filteredscenario;
      });
    }
  }

  selectScenario(event: any, selectedScenario: ScenarioData) {
    if (event.checked) {
      this.selectedScenarios.push({
        isChecked: event.checked,
        scenarioId: selectedScenario.scenarioId,
        scenarioName: selectedScenario.scenarioName,
        scenarioStatus: selectedScenario.scenarioStatus,
        optimizerObjective: selectedScenario.optimizerObjective,
        lastUpdatedDate: selectedScenario.lastUpdatedDate,
        approvalFlag: selectedScenario.approvalFlag,
        priorityOrder: selectedScenario.priorityOrder
      });
    } else {
      var index = this.selectedScenarios.map(function(scenario){
         return scenario.scenarioId;
        }).indexOf(selectedScenario.scenarioId);
      if (index > -1)
        this.selectedScenarios.splice(index, 1);
    }
  }

  saveClonedData() {
    this.createTrackSerice.trackName = this.newTrackName;
    this.selectedScenarios.forEach((scenario: ScenarioData) => {
      this.createTrackSerice.selectedCloneScenario.push(scenario.scenarioId.toString());
    })
    this.router.navigate(['../../track/scenario/'+this.trackData.trackId+'/cloneTrack'], { relativeTo: this.activeRouter });
  }
}
