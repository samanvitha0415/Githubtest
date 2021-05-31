import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { first } from '../../../../node_modules/rxjs/operators';
import { TrackService } from '../services/track.service';

export interface ViewTrackElement {
  scenarioDetails: string;
  status: string;
}

@Component({
  selector: "app-view-tracks",
  templateUrl: "./view-tracks.component.html",
  styleUrls: ["./view-tracks.component.scss"]
})
export class ViewTracksComponent implements OnInit {
  public data: any;
  public showsortedTracks = "all";
  public allTracks: any;
  public draftTracks: Array<any> = [];
  public approvedTracks: Array<any> = [];
  public inProgressTracks: Array<any> = [];
  routerClass: any;
  selectedTrackScenario: any;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private trackService: TrackService,
    private activeRouter: ActivatedRoute) { }

  displayedColumns: string[] = [
    "scenarioDetails",
    "status",
    "search",
    "filter"
  ];
  dataSource: ViewTrackElement[] = [];
  isDialogOpen: boolean = false;
  track: any = {};

  ngOnInit(): void {

    this.activeRouter.params.pipe(first()).subscribe((params: any) => {
      this.trackService.getTrack(params.id).pipe(first()).subscribe((data: any) => {
        this.track = data;
        this.dataSource = data.scenarioList
      });
    });

  }
  filterBy(event: { target: { value: string } }) {
    if (event.target.value === "draft") this.data = this.draftTracks;
    else if (event.target.value === "approved") this.data = this.approvedTracks;
    else if (event.target.value === "inProgress")
      this.data = this.inProgressTracks;
  }

  // searchTrackData(searchTerm: string) {
  //   searchTerm = searchTerm.toLowerCase();
  //   if (searchTerm.length > 0) {
  //     this.tracksData = this.clonedTracksData.filter((track: any) => {
  //       return (
  //         track.status.toLowerCase().includes(searchTerm) ||
  //         track.track.toLowerCase().includes(searchTerm) ||
  //         track.scenariosCount.toLowerCase().includes(searchTerm)
  //       );
  //     });
  //   } else {
  //     this.tracksData = this.clonedTracksData;
  //   }
  // }



  backtolistroute() {
    // this.routerClass = address;
    this.router.navigateByUrl("/mim/track");
  }

  openViewTrackDailog(element: any) {
    this.isDialogOpen = true;
    this.selectedTrackScenario = element;
  }

  closeViewTrackScenario() {
    this.isDialogOpen = false;
  }
  executeTracks(event: any) {
    this.router.navigateByUrl('/mim/execute-track')
  }
  showTrack(event: any) {
    this.dialog.open(NotesDialog);
  }

  cloneTracks(){
    this.router.navigateByUrl('/mim/clonetrack')
}
}

@Component({
  selector: "notes-dialog",
  templateUrl: "notes-dialog.html"
})
export class NotesDialog {
  constructor(public dialog: MatDialog) { }
  closeTrack(event: any) {
    this.dialog.closeAll();
  }
}