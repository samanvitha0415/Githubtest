import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ExecuteTrackService } from '../../services/execute-track/execute-track.service';

@Component({
  selector: 'app-execute-track-sub',
  templateUrl: './execute-track-sub.component.html',
  styleUrls: ['./execute-track-sub.component.scss']
})
export class ExecuteTrackSubComponent implements OnInit {

  
  
  public data: any;
  public showsortedTracks = 'all';
  public allTracks:any;
  public allScenarios:any;
  public draftTracks:Array<any> = [];
  public approvedTracks:Array<any> = [];
  public inProgressTracks:Array<any> = [];
  routerClass: any;

  public trackData: any = '';
  public trackNote: any = '';
  public trackName: any = '';
  public trackId: any = '';
  public lastUpdatedDate: any = '';

  constructor(private router: Router, public dialog: MatDialog, private executeTrackService:  ExecuteTrackService) { }

  ngOnInit(): void {
    this.allScenarios = this.executeTrackService.trackData;
    this.trackData = this.executeTrackService.trackData;
    this.trackNote = this.executeTrackService.trackData.trackNotes;
    this.trackName = this.executeTrackService.trackData.trackName;
    this.trackId = this.executeTrackService.trackData.trackId;
    this.lastUpdatedDate = this.executeTrackService.trackData.lastUpdatedDate;
  }

  selectedScenario(event: any, scenario: any, scenarioFull: any) {
    this.executeTrackService.selectedScenarios.push(scenario);
    this.executeTrackService.selectedScenariosFull.push(scenarioFull);

    // if (event.checked) {
    //   this.executeTrackService.selectedScenarios.push(scenario);
    // } else {
    //   const index = this.executeTrackService.selectedScenarios.indexOf(scenario);
    //   if (index > -1)
    //     this.executeTrackService.selectedScenarios.splice(index, 1);
    // }
  }


  filterBy(event: { target: { value: string; }; }){
    if(event.target.value === 'draft')
      this.data = this.draftTracks;
    else if(event.target.value === 'approved')
      this.data = this.approvedTracks;
    else if(event.target.value === 'inProgress')
      this.data = this.inProgressTracks;
  }


  backtolistroute(){
    // this.routerClass = address;
    this.router.navigateByUrl('/mim/track')
  
  }

  
  showTrack(event: any) {
    this.dialog.open(TrackDialog);
   event.stopPropagation();
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
