import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TrackService } from '../../services/track.service';
import { first } from '../../../../../node_modules/rxjs/operators';
import { ApproveTrackService } from '../../services/approve-track.service';

export interface ViewTrackElement {
  scenarioDetails: string;
  status: string;
}

@Component({
  selector: 'app-approve-track-view',
  templateUrl: './approve-track-view.component.html',
  styleUrls: ['./approve-track-view.component.scss']
})
export class ApproveTrackViewComponent implements OnInit {

  public data: any;
  public showsortedTracks = 'all';
  public allTracks: any;
  public draftTracks: Array<any> = [];
  public approvedTracks: Array<any> = [];
  public inProgressTracks: Array<any> = [];
  routerClass: any;

  public track: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private trackService: TrackService,
    public approveTrackService: ApproveTrackService,
    private activeRouter: ActivatedRoute
  ) { }

  displayedColumns: string[] = ['scenarioDetails', 'status', 'search', 'filter'];
  dataSource: ViewTrackElement[] = [];
  isDialogOpen: boolean = false;
  isDialogDiasble: boolean = true;

  ngOnInit(): void {
    this.activeRouter.params.pipe(first()).subscribe((params: any) => {
      this.trackService.getTrack(params.id).pipe(first()).subscribe((data: any) => {
        this.track = data;
        this.dataSource = data.scenarioList
      });
    });
  }

  filterBy(event: { target: { value: string; }; }) {
    if (event.target.value === 'draft')
      this.data = this.draftTracks;
    else if (event.target.value === 'approved')
      this.data = this.approvedTracks;
    else if (event.target.value === 'inProgress')
      this.data = this.inProgressTracks;
  }

  showTrack(event: any) {
  }

  openViewTrackDailog(element: any) {
    this.isDialogOpen = true;
  }

  closeSummary() {
    this.isDialogOpen = false;
  }

  selectedScenario(event: any, scenario: any) {
    if (event.checked) {
      this.approveTrackService.selectedScenarios.push(scenario);
    } else {
      const index = this.approveTrackService.selectedScenarios.indexOf(scenario);
      if (index > -1)
        this.approveTrackService.selectedScenarios.splice(index, 1);
    }
  }

}
