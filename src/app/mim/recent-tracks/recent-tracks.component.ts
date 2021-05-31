import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recent-tracks',
  templateUrl: './recent-tracks.component.html',
  styleUrls: ['./recent-tracks.component.scss']
})
export class RecentTracksComponent implements OnInit {

  @Input() recentTracks: any;

  constructor(public router: Router) { }

  ngOnInit(): void {

  }
  cloneTracks(trackID: any) {
    console.log(trackID);
    this.router.navigate(['mim/clonetrack/', trackID]);
  }

  ngOnChanges() {
    console.log(this.recentTracks);
  }

}
