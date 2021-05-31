import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTrackService } from '../../services/create-track.service';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  constructor(
    public createTrackService: CreateTrackService,
    public router: Router,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  
  discard() {
    const dialogRef = this.dialog.open(DiscardCreateTrackDialog);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.router.navigate(['../../tracks'], { relativeTo: this.route });
      } else {
        console.log('Discard cancelled');
      }
    });
  }
}

@Component({
  selector: 'create-track-dialog',
  templateUrl: 'create-track-dialog.html',
})
export class DiscardCreateTrackDialog {

}

