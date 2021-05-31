import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { TrackService } from '../services/track.service';

export interface ViewTrackElement {
  scenarioDetails: string;
  status: string;
}

@Component({
  selector: 'app-track-view',
  templateUrl: './track-view.component.html',
  styleUrls: ['./track-view.component.scss']
})
export class TrackViewComponent implements OnInit {

  public data: any;
  public showsortedTracks = 'all';
  public allTracks: any;
  public draftTracks: Array<any> = [];
  public approvedTracks: Array<any> = [];
  public inProgressTracks: Array<any> = [];
  routerClass: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private trackService: TrackService,
    private activeRouter: ActivatedRoute
  ) { }

  displayedColumns: string[] = ['scenarioDetails', 'status', 'search', 'filter'];
  dataSource: ViewTrackElement[] = [];
  isDialogOpen: boolean = false;
  isDialogDiasble: boolean = true;
  track: any = {};

  ngOnInit(): void {
    this.getTrack();
  }

  getTrack() {
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


  showTrack() {
    const dialogRef =  this.dialog.open(NotesDialog, { disableClose: false });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openViewTrackDailog(element: any) {
    this.isDialogOpen = true;
  }

  closeSummary() {
    this.isDialogOpen = false;
  }

  invalidateScenario(id: string) {
    this.trackService.invalidateScenario(id)
    .pipe(first())
    .subscribe(res =>  {
      this.getTrack();
    })
  }
}

@Component({
  selector: 'notes-dialog',
  templateUrl: 'notes-dialog.html',
})
export class NotesDialog { }
