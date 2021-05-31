import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTrackService } from '../../services/create-track/create-track.service';

@Component({
  selector: 'app-create-summary.component',
  templateUrl: './create-summary.component.html',
  styleUrls: ['./create-summary.component.scss']
})
export class CreateSummaryComponent implements OnInit {

 // constructor(public router: Router, public route: ActivatedRoute) { }

  constructor(
    public createTrackService: CreateTrackService,
    public router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }


  discard() {
    this.router.navigate(['../../track'], { relativeTo: this.route });
  }
}