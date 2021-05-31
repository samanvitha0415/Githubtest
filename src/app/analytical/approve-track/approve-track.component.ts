import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { first } from '../../../../node_modules/rxjs/operators';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-approve-track',
  templateUrl: './approve-track.component.html',
  styleUrls: ['./approve-track.component.scss']
})
export class ApproveTrackComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  public data: any;
  public list: boolean = true;
  public showsortedTracks = 'all';
  public allTracks: any;
  public selectedTrack: any;

  constructor(
    private dashboardService: DashboardService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.dashboardService.getTracks().pipe(first()).subscribe((data:any) => {
      this.allTracks = data.teamTracks;
    });

  }
  showTrack(event: any) {
    event.stopPropagation();
  }

  veiwTrack(event: any) {
    event.stopPropagation();
  }

  menuClick(event: any) {
    event.stopPropagation();
  }


  filterBy(event: { target: { value: string; }; }) {
    // if (event.target.value === 'draft')
    //   this.data = this.draftTracks;
    // else if (event.target.value === 'approved')
    //   this.data = this.approvedTracks;
    // else if (event.target.value === 'inProgress')
    //   this.data = this.inProgressTracks;
  }

  selectTrack(event: any){
    this.selectedTrack = event.value;
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
