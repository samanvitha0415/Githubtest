import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { TrackDetailsService } from '../../services/trackdetails/track-details.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { DashboardService } from '../services/dashboard.service';
import { CreateTrackService } from '../services/create-track.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss']
})
export class TracksComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  public showsortedTracks = 'all';
  public teamTracks: any;
  public filteredTeamTracks: any;
  public myTrackList: any;
  public filteredMyTrackList: any;
  public summaryData: any

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    public router: Router,
    private dashboardService: DashboardService,
    public createTrackService: CreateTrackService
  ) { }

  ngOnInit(): void {
    this.createTrackService.reset();
    this.dashboardService.getTracks().pipe(first()).subscribe((data: any) => {
      this.teamTracks = data.teamTracks;
      this.filteredTeamTracks = data.teamTracks;
      this.myTrackList = data.usertracks.myTrackList;
      this.filteredMyTrackList = data.usertracks.myTrackList;
      this.summaryData = { 'recentTrackList': data.usertracks.recentTracks, 'statusSummary': data.usertracks.statusSummary };
    });
  }

  showTrack(event: any) {
    this.dialog.open(TrackDialog, { disableClose: true });
    event.stopPropagation();
  }

  veiwTrack(event: any, id: string) {
    this.router.navigate(['analytical/viewTrack', id]);
    event.stopPropagation();
  }

  menuClick(event: any) {
    event.stopPropagation();
  }

  filterBy(event: { target: { value: string; }; }) {
  }

  getScenarioCount(status: string, summary: any[]) {
    let count = 0;
    summary.forEach((data: any) => {
      if (data.status == status)
        count = data.noOfScenarios;
    });
    return count;
  }

}

@Component({
  selector: 'track-dialog',
  templateUrl: 'track-dialog.html',
})
export class TrackDialog { }
