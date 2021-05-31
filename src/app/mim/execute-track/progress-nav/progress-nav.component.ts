import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { ExecuteTrackService } from '../../services/execute-track/execute-track.service';
import { first } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-progress-nav',
  templateUrl: './progress-nav.component.html',
  styleUrls: ['./progress-nav.component.scss']
})
export class ProgressNavComponent implements OnInit {
  public allScenarios:any;
  public trackID: string = "";
  public newBudget: number = 0;

  constructor(public router: Router, public route: ActivatedRoute, private executeTrackService:  ExecuteTrackService) { }

  @Input() step: number = 1;


  ngOnInit(): void {
    this.allScenarios = this.executeTrackService.selectedScenarios;
    this.trackID = this.executeTrackService.trackID;
    this.newBudget = this.executeTrackService.newBudget;
  }

  next(allScenarios: any,trackID: any,newBudget: any) {
    if (this.step == 1) {
      this.router.navigate(['../execute-track-notes'], { relativeTo: this.route });
    }
    if (this.step == 2) {
      this.router.navigate(['../execute-track-sub'], { relativeTo: this.route });
    }
    if (this.step == 3) {
      this.router.navigate(['../execute-track-details'], { relativeTo: this.route });
    }
    if (this.step == 4) {
      this.router.navigate(['../execute-track-summary'], { relativeTo: this.route });
    }
    if (this.step == 5) {
          
      
      
      this.executeTrackService.setScenario(allScenarios,trackID,newBudget)
      .pipe(first())
          .subscribe(res => {
            this.executeTrackService.selectedScenarios = [];
              this.router.navigate(['../../track']);
              this.router.navigate(['../'], { relativeTo: this.route });
           
          });





    }
  }


  previous() {
    if (this.step == 1) {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
    if (this.step == 2) {
      this.router.navigate(['../execute-track'], { relativeTo: this.route });
    }
    if (this.step == 3) {
      this.router.navigate(['../execute-track-notes'], { relativeTo: this.route });
    }
    if (this.step == 4) {
      this.router.navigate(['../execute-track-sub'], { relativeTo: this.route });
    }
    if (this.step == 5) {
      this.router.navigate(['../execute-track-details'], { relativeTo: this.route });
    }
  }

}
