import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MIMComponent } from './mim.component';
import { HomeComponent } from './home/home.component';
import { TracksComponent } from './tracks/tracks.component';
import { ViewTracksComponent } from './view-tracks/view-tracks.component';
import { CloneTrackComponent } from './clone-track/clone-track.component';
import { ExecuteTrackComponent } from './execute-track/execute-track.component';
import { ExecuteTrackNotesComponent } from './execute-track/execute-track-notes/execute-track-notes.component';
import { ExecuteTrackSubComponent } from './execute-track/execute-track-sub/execute-track-sub.component';
import { DetailsComponent } from './execute-track/details/details.component';
import { SummaryComponent } from './execute-track/summary/summary.component';
import { CreateTrackComponent } from './create-track/create-track.component';
// import { DetailsComponent } from './create-track/details/details.component';
import { DecisionComponent } from './create-track/decision/decision.component';
import { XmlComponent } from './create-track/xml/xml.component';
import { ScenarioComponent } from './create-track/scenario/scenario.component';
import { CreateSummaryComponent } from './create-track/create-summary/create-summary.component';
import { CreateDetailsComponent } from './create-track/create-details/create-details.component';

const routes: Routes = [
  {
    path: '', component: MIMComponent,

    children: [
      { path: '', component: HomeComponent },
      { path: 'track', component: TracksComponent },
      { path: 'viewTrack/:id', component: ViewTracksComponent },
      { path: 'clonetrack/:id', component: CloneTrackComponent },
      //create track section
      { path: 'track/create', component: CreateTrackComponent },
      { path: 'track/details', component: CreateDetailsComponent },
      { path: 'track/decision', component: DecisionComponent },
      { path: 'track/xml', component: XmlComponent },
      { path: 'track/scenario', component: ScenarioComponent },
      { path: 'track/scenario/:id/:type', component: ScenarioComponent },
      { path: 'track/summary', component: CreateSummaryComponent },
      // Execute track section
      { path: 'execute-track', component: ExecuteTrackComponent },
      { path: 'execute-track-notes', component: ExecuteTrackNotesComponent },
      { path: 'execute-track-sub', component: ExecuteTrackSubComponent },
      { path: 'execute-track-details', component: DetailsComponent },
      { path: 'execute-track-summary', component: SummaryComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MIMRoutingModule { }

