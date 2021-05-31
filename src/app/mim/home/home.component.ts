import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { Router, RouterModule, ActivatedRoute } from "@angular/router";
import { MimService } from '../services/mim.service';
import { TrackDetailsService } from "src/app/services/trackdetails/track-details.service";
import { Subscription } from 'rxjs'; // later
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   public mimData: any;
   public prodTracksData: any;
  public clonedProdTracksData: any;
  public teamTracksData: any;
  public clonedTeamTracksData: any;
  public summaryData:any

   constructor(
    private trackDetailsService: TrackDetailsService,
     public router: Router, 
     private route: ActivatedRoute, 
     private _router: Router,
     private dashboard: MimService) {
 }

  ngOnInit(): void {
    this.getMimData();
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

  executeTracks(event:any){
    this.router.navigateByUrl('/mim/execute-track')
  }

  getMimData() {
    this.dashboard.getMimHomepageData().subscribe(
      response => {
        //console.log(response);
        this.mimData = response;
      },
      err => {
        console.log(err);
      }
    );
  }


}
