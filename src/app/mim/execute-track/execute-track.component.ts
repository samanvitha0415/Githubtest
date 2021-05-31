import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { TrackDetailsService } from 'src/app/services/trackdetails/track-details.service';
import { Router, RouterModule } from '@angular/router';
import { MimService } from '../services/mim.service';
import { ExecuteTrackService } from '../services/execute-track/execute-track.service';






@Component({
  selector: 'app-execute-track',
  templateUrl: './execute-track.component.html',
  styleUrls: ['./execute-track.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExecuteTrackComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  public tracksData: any;
  public clonedTracksData: any;
  public data: any;
  public list: boolean = true;
  public card: boolean = false;
  public showsortedTracks = 'all';
  public allTracks: any;
  public draftTracks: Array<any> = [];
  public approvedTracks: Array<any> = [];
  public inProgressTracks: Array<any> = [];
  routerClass: any;

  public prodTracksData: any;
  public clonedProdTracksData: any;
  public teamTracksData: any;
  public clonedTeamTracksData: any;
  public summaryData:any


  constructor(private trackDetailsService: TrackDetailsService, public dialog: MatDialog, public router: Router,  private dashboard: MimService, private executeTrackService:  ExecuteTrackService) {

  }

  ngOnInit(): void {
     this.getTracks();
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


          this.prodTracksData = this.prodTracksData.filter((track: any) => {
            //alert('all');
            // return track.status.toLowerCase() == filteredTrack;
            return track.trackStatus;
          });


          console.log(response.usertracks.statusSummary)
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  veiwTrack(event: any, id: string) {
    this.router.navigate(['mim/viewTrack/', id]);
    event.stopPropagation();
  }
  getTracks() {
    this.trackDetailsService.getTrackDtsl().subscribe(
      response => {
        this.tracksData = response;
        this.clonedTracksData = Object.assign([], this.tracksData);
        this.tracksData = this.clonedTracksData.filter((track: any) => {
         // alert('all');
          // return track.status.toLowerCase() == filteredTrack;
          return track.status.toLowerCase() == "approved";
        });

        
      },
      err => {
        console.log(err);
      }
    );
  }

  filterBy(event: any) {
    const filteredTrack = event.target.value;
    if (filteredTrack === "all") {
      this.tracksData = "all";
    } else {
      this.tracksData = this.clonedTracksData.filter((track: any) => {
       return track.status.toLowerCase() == "APPROVED";
      });
    }
  }

  

  showTrack(event: any) {
     this.dialog.open(TrackDialog);
    event.stopPropagation();
  }

  radio(event: any, ID : any) {
    this.executeTrackService.setTrackId(ID);
    event.stopPropagation();
 }

 searchTrackData(searchTerm: string) {
  searchTerm = searchTerm.toLowerCase();
  if (searchTerm.length > 0) {
    console.log('seatrch');
    this.tracksData = this.clonedTracksData.filter((track: any) => {
      return (
        track.status.toLowerCase().includes(searchTerm) ||
        track.track.toLowerCase().includes(searchTerm) ||
        track.scenariosCount.toLowerCase().includes(searchTerm)
      );
    });
  } else {
    this.tracksData = this.clonedTracksData;
  }
}

}

@Component({
  selector: "track-dialog",
  templateUrl: "track-dialog.html"
})
export class TrackDialog {
  constructor(public dialog: MatDialog) {}
  closeTrack(event: any) {
    this.dialog.closeAll();
  }
}

