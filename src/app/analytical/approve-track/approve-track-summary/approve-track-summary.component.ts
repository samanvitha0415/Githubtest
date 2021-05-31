import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TrackService } from '../../../mim/services/track.service';
import { ApproveTrackService } from '../../services/approve-track.service';
import { first } from 'rxjs/operators';


export interface ViewTrackElement {
  scenarioDetails: string;
  status: string;
}

@Component({
  selector: 'app-approve-track-summary',
  templateUrl: './approve-track-summary.component.html',
  styleUrls: ['./approve-track-summary.component.scss']
})
export class ApproveTrackSummaryComponent implements OnInit {

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
      });
    });
    this.approveTrackService.selectedScenarios.forEach((s: any, index: number) => {
      s.priority = index + 1;
    });
    this.dataSource = this.approveTrackService.selectedScenarios;
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

  approve() {
    this.approveTrackService.approveTracks(this.track)
      .pipe(first())
      .subscribe(res => {
        this.router.navigate(['../../tracks'], { relativeTo: this.activeRouter });
      });
  }


}
