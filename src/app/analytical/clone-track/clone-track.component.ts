import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TrackService } from '../services/track.service';
import { ApproveTrackService } from '../services/approve-track.service';
import { first } from 'rxjs/operators';
import { CreateTrackService } from '../services/create-track.service';

export interface ViewTrackElement {
  scenarioDetails: string;
  status: string;
}

@Component({
  selector: 'app-clone-track',
  templateUrl: './clone-track.component.html',
  styleUrls: ['./clone-track.component.scss']
})
export class CloneTrackComponent implements OnInit {

  public data: any;
  public showsortedTracks = 'all';
  public allTracks: any;
  public draftTracks: Array<any> = [];
  public approvedTracks: Array<any> = [];
  public inProgressTracks: Array<any> = [];
  routerClass: any;
  public track: any;
  public newTrackName: string = "";
  selectedScenarios: string[] = [];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private trackService: TrackService,
    private activeRouter: ActivatedRoute,
    public createTrackSerice: CreateTrackService
  ) { }

  displayedColumns: string[] = ['scenarioDetails', 'status', 'search', 'filter'];
  dataSource: ViewTrackElement[] = [];
  isDialogOpen: boolean = false;
  isDialogDiasble: boolean = true;

  ngOnInit(): void {
    this.activeRouter.params.pipe(first()).subscribe((params: any) => {
      this.trackService.getTrack(params.id).pipe(first()).subscribe((data: any) => {
        this.track = data;
        this.newTrackName = this.track.trackName + " clone name";
        this.dataSource = data.scenarioList
        this.createTrackSerice.reset();
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


  backtolistroute() {
    // this.routerClass = address;
    this.router.navigateByUrl('/mim/track')

  }
  showTrack(event: any) {
  }

  openViewTrackDailog(element: any) {
    this.isDialogOpen = true;
  }

  closeSummary() {
    this.isDialogOpen = false;
  }

  selectedScenario(event: any, scenario: string) {
    if (event.checked) {
      this.selectedScenarios.push(scenario);
    } else {
      const index = this.selectedScenarios.indexOf(scenario);
      if (index > -1)
        this.selectedScenarios.splice(index, 1);
    }
  }

  next() {
    const queryParams: any = {};
    queryParams.trackName = this.newTrackName;
    queryParams.scenarios = JSON.stringify(this.selectedScenarios);
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activeRouter,
      queryParams
    };
    this.router.navigate(['../../cloneTrackReview', this.track.trackId], navigationExtras);
  }

}
