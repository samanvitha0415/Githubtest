import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TrackService } from '../../services/track.service';
import { first } from 'rxjs/operators';
import { CreateTrackService } from '../../services/create-track.service';

export interface ViewTrackElement {
  scenarioDetails: string;
  status: string;
}

@Component({
  selector: 'app-clone-track-review',
  templateUrl: './clone-track-review.component.html',
  styleUrls: ['./clone-track-review.component.scss']
})
export class CloneTrackReviewComponent implements OnInit {

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
    private createTrackSerice: CreateTrackService,
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
        this.newTrackName = '' + this.activeRouter.snapshot.queryParamMap.get('trackName');
        const arr = this.activeRouter.snapshot.queryParamMap.get('scenarios')
        if (arr === null) {
          this.selectedScenarios = new Array<string>();
        } else {
          this.selectedScenarios = JSON.parse(arr);
        }
        this.dataSource = []
        data.scenarioList.forEach((scenario: any) => {
          if(this.selectedScenarios.indexOf(scenario.scenarioId) != -1) {
            this.dataSource.push(scenario);
          }
        })
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

  saveClone(){
    this.createTrackSerice.trackName = this.newTrackName;
    this.createTrackSerice.selectedCloneScenario = this.selectedScenarios;
    this.router.navigate(['../../track/scenario/'+this.track.trackId+'/cloneTrack'], { relativeTo: this.activeRouter });
  }
}
