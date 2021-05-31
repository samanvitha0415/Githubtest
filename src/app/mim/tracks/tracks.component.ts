import { Component, OnInit, ViewChild } from "@angular/core";
import { MatAccordion } from "@angular/material/expansion";
import { MatDialog } from "@angular/material/dialog";
import { TrackDetailsService } from "src/app/services/trackdetails/track-details.service";
import { Router, RouterModule, ActivatedRoute } from "@angular/router";
import { MimService } from '../services/mim.service';

@Component({
  selector: "app-tracks",
  templateUrl: "./tracks.component.html",
  styleUrls: ["./tracks.component.scss"]
})
export class TracksComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  public prodTracksData: any;
  public clonedProdTracksData: any;
  public teamTracksData: any;
  public clonedTeamTracksData: any;
  public summaryData: any
  public list: boolean = true;
  public card: boolean = false;
  public showsortedTracks = "all";

  routerClass: any;
  selectedTab: string = "Production Tracks";

  constructor(
    private trackDetailsService: TrackDetailsService,
    public dialog: MatDialog,
    public router: Router,
    private dashboard: MimService
  ) { }

  ngOnInit(): void {
    this.card = true;
    this.getTracksData();
  }

  getTracksData() {
    this.dashboard.getTrackListData().subscribe(
      (response: any) => {
        if (response) {
          this.prodTracksData = response.pendingProductionTracks;
          this.clonedProdTracksData = Object.assign([], this.prodTracksData);
          this.teamTracksData = response.usertracks.myTrackList;
          this.clonedTeamTracksData = Object.assign([], this.teamTracksData);
          this.summaryData = {
            'trackList': response.usertracks.recentTracks,
            'statusSummary': response.usertracks.statusSummary
          };
          console.log(response.usertracks.statusSummary)
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  showTrack(event: any) {
    this.dialog.open(TrackDialog);
    event.stopPropagation();
  }
  cloneTracks(trackID: any) {
    console.log(trackID);
    this.router.navigate(['mim/clonetrack/', trackID]);
  }

  listView() {
    this.card = false;
    this.list = true;
  }
  cardView() {
    this.card = true;
    this.list = false;
  }

  filterBy(event: any) {
    const filteredTrack = event.target.value;
    if (this.selectedTab = "Production Tracks") {
      if (filteredTrack === "all") {
        this.prodTracksData = this.clonedProdTracksData;
      } else {
        this.prodTracksData = this.clonedProdTracksData.filter((track: any) => {
          return track.trackStatus.toLowerCase() == filteredTrack;
        });
      }
    } else {
      if (filteredTrack === "all") {
        this.teamTracksData = this.clonedTeamTracksData;
      } else {
        this.teamTracksData = this.clonedTeamTracksData.filter((track: any) => {
          return track.trackStatus.toLowerCase() == filteredTrack;
        });
      }
    }
  }

  searchTrackData(searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();
    if (searchTerm.length > 0) {
      this.prodTracksData = this.clonedProdTracksData.filter((track: any) => {
        return (
          track.trackStatus.toLowerCase().includes(searchTerm) ||
          track.trackName.toLowerCase().includes(searchTerm) ||
          track.noOfScenarios.toString().includes(searchTerm)
        );
      });
    } else {
      this.prodTracksData = this.clonedProdTracksData;
    }
  }

  menuClick(event: any) {
    event.stopPropagation();
  }

  onTabClick(event: any) {
    this.selectedTab = event.tab.textLabel;
    console.log(this.selectedTab);
  }

  executeTracks(event: any) {
    this.router.navigateByUrl('/mim/execute-track')
  }

  veiwTrack(event: any, id: string) {
    this.router.navigate(['mim/viewTrack/', id]);
    event.stopPropagation();
  }
}

@Component({
  selector: "track-dialog",
  templateUrl: "track-dialog.html"
})
export class TrackDialog {
  constructor(public dialog: MatDialog) { }
  closeTrack(event: any) {
    this.dialog.closeAll();
  }
}
