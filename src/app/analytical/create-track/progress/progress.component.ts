import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateTrackService } from '../../services/create-track.service';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {
  isTrackValidated: boolean = false;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public createTrackService: CreateTrackService
  ) { }


  @Input() step: number = 1;
  @Output() emitIsNextBtnClicked = new EventEmitter<boolean>();
  ngOnInit(): void {

    this.createTrackService.getIsTrackValidated().subscribe(response => {
      this.isTrackValidated = response;
    });
  }
  enableSubmit = false;

  next() {

    this.emitIsNextBtnClicked.emit();
    console.log("Is Track Validated: ", this.isTrackValidated);
    if (this.isTrackValidated) {
      if (this.step == 1) {
        this.router.navigate(['../details'], { relativeTo: this.route });
      }
      if (this.step == 2) {
        this.router.navigate(['../decision'], { relativeTo: this.route });
      }
      if (this.step == 3) {
        this.router.navigate(['../xml'], { relativeTo: this.route });
      }
      if (this.step == 4) {
        this.router.navigate(['../scenario'], { relativeTo: this.route });
      }
      if (this.step == 5) {
        if (this.createTrackService.type == "addScenario" || this.createTrackService.type == "cloneTrack") {
          this.router.navigate(['../../../summary'], { relativeTo: this.route });
        } else {
          if (this.isTrackValidated)
            this.router.navigate(['../summary'], { relativeTo: this.route });

        }
      }
    }
  }
  previous() {
    if (this.step == 2) {
      this.router.navigate(['../create'], { relativeTo: this.route });
    }
    if (this.step == 3) {
      this.router.navigate(['../details'], { relativeTo: this.route });
    }
    if (this.step == 4) {
      this.router.navigate(['../decision'], { relativeTo: this.route });
    }
    if (this.step == 5) {
      this.router.navigate(['../xml'], { relativeTo: this.route });
    }
    if (this.step == 6) {
      this.router.navigate(['../scenario'], { relativeTo: this.route });
    }
  }


  submit() {

    if (this.createTrackService.type == "addScenario") {
      this.createTrackService.submitScenario().pipe(first())
        .subscribe((data: any) => {
          if (this.createTrackService.selectedCloneScenario.length > 0)
            this.createTrackService.selectedCloneScenario.shift();
          if (this.createTrackService.selectedCloneScenario.length > 0) {
            this.createTrackService.scenarioName = "Scenario Name";
            this.createTrackService.optimizerObjective = "";
            this.createTrackService.scenarioId = "";
            this.router.navigate(['../scenario/' + this.createTrackService.trackId + '/addScenario'], { relativeTo: this.route });
          } else {
            this.router.navigate(['../../tracks'], { relativeTo: this.route });
            this.createTrackService.reset();
          }
        });
    } else {
      this.createTrackService.submitScenario().pipe(first())
        .subscribe((data: any) => {
          if (this.createTrackService.type == "cloneTrack") {
            this.createTrackService.selectedCloneScenario.shift();
            if (this.createTrackService.selectedCloneScenario.length > 0) {
              this.createTrackService.scenarioName = "Scenario Name";
              this.createTrackService.optimizerObjective = "";
              this.createTrackService.scenarioId = "";
              this.router.navigate(['../scenario/' + this.createTrackService.trackId + '/addScenario'], { relativeTo: this.route });
            } else {
              this.router.navigate(['../../tracks'], { relativeTo: this.route });
              this.createTrackService.reset();
            }
          } else {
            this.router.navigate(['../../tracks'], { relativeTo: this.route });
            this.createTrackService.reset();
          }
        });
    }
  }


  save() {
    if (this.createTrackService.type == "addScenario") {
      this.createTrackService.addScenario().pipe(first())
        .subscribe((data: any) => {
          this.createTrackService.scenarioId = data;
          this.enableSubmit = true;
        });
    } else {
      this.createTrackService.saveTrack().pipe(first()).subscribe((res: any) => {
        this.createTrackService.scenarioId = res.scenarioId;
        this.createTrackService.trackId = res.trackId;
        this.enableSubmit = true;
      });
    }
  }


  cancel() {
    this.router.navigate(['../../track'], { relativeTo: this.route });
    this.createTrackService.reset();
  }
}
