import { Component, OnInit } from '@angular/core';
import { ExecuteTrackService } from '../../services/execute-track/execute-track.service';

@Component({
  selector: 'app-execute-track-notes',
  templateUrl: './execute-track-notes.component.html',
  styleUrls: ['./execute-track-notes.component.scss']
})
export class ExecuteTrackNotesComponent implements OnInit {
  public trackData: any = '';
  public trackNote: any = '';
  public trackName: any = '';
  public trackId: any = '';
  public lastUpdatedDate: any = '';


  constructor(private executeTrackService:  ExecuteTrackService) { }

  ngOnInit(): void {
    this.trackData = this.executeTrackService.trackData;
    this.trackNote = this.executeTrackService.trackData.trackNotes;
    this.trackName = this.executeTrackService.trackData.trackName;
    this.trackId = this.executeTrackService.trackData.trackId;
    this.lastUpdatedDate = this.executeTrackService.trackData.lastUpdatedDate;
  }

}
