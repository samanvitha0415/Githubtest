import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../services/track.service';
import { ApproveTrackService } from '../../services/approve-track.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-approve-track-notes',
  templateUrl: './approve-track-notes.component.html',
  styleUrls: ['./approve-track-notes.component.scss']
})
export class ApproveTrackNotesComponent implements OnInit {

  public track:any;

  constructor(
    private trackService: TrackService,
    public approveTrackService: ApproveTrackService,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRouter.params.pipe(first()).subscribe((params: any) => {
      this.trackService.getTrack(params.id).pipe(first()).subscribe((data: any) => {
        this.track = data;
      });
    });
  }

}
