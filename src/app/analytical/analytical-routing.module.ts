import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticalComponent } from './analytical.component';
import { HomeComponent } from './home/home.component';
import { TracksComponent } from './tracks/tracks.component';
import { CreateTrackComponent } from './create-track/create-track.component';
import { DetailsComponent } from './create-track/details/details.component';
import { DecisionComponent } from './create-track/decision/decision.component';
import { XmlComponent } from './create-track/xml/xml.component';
import { ScenarioComponent } from './create-track/scenario/scenario.component';
import { SummaryComponent } from './create-track/summary/summary.component';
import { ApproveTrackComponent } from './approve-track/approve-track.component';
import { ApproveTrackViewComponent } from './approve-track/approve-track-view/approve-track-view.component';
import { ApproveTrackNotesComponent } from './approve-track/approve-track-notes/approve-track-notes.component';
import { ApproveTrackSummaryComponent } from './approve-track/approve-track-summary/approve-track-summary.component';
import { CloneTrackComponent } from './clone-track/clone-track.component';
import { CloneTrackReviewComponent } from './clone-track/clone-track-review/clone-track-review.component';
import { TrackViewComponent } from './track-view/track-view.component';

const routes: Routes = [
  {
   path: '',
   component: AnalyticalComponent,
   children: [
     {path: '', component: HomeComponent},
     {path: 'tracks', component: TracksComponent},
     {path: 'track/create', component: CreateTrackComponent},
     {path: 'track/details', component: DetailsComponent},
     {path: 'track/decision', component: DecisionComponent},
     {path: 'track/xml', component: XmlComponent},
     {path: 'track/scenario', component: ScenarioComponent},
     {path: 'track/scenario/:id/:type', component: ScenarioComponent},
     {path: 'track/summary', component: SummaryComponent},
     {path: 'approveTrack', component: ApproveTrackComponent},
     {path: 'approveTrackView/:id', component: ApproveTrackViewComponent},
     {path: 'approveTrackNotes/:id', component: ApproveTrackNotesComponent},
     {path: 'approveTrackSummary/:id', component: ApproveTrackSummaryComponent},
     {path: 'cloneTrack/:id', component: CloneTrackComponent},
     {path: 'cloneTrackReview/:id', component: CloneTrackReviewComponent},
     {path: 'viewTrack/:id', component: TrackViewComponent}
   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticalRoutingModule { }
