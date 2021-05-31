import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MIMRoutingModule } from './mim-routing.module';
import { MIMComponent } from './mim.component';
import { HomeComponent } from './home/home.component';
import { TracksComponent } from './tracks/tracks.component';
import { TrackSummaryComponent } from './track-summary/track-summary.component';
import { LeftNavigationComponent } from './left-navigation/left-navigation.component';
import { RecentTracksComponent } from './recent-tracks/recent-tracks.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { TrackDetailsService } from '../services/trackdetails/track-details.service';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';
import { MatExpansionModule } from '@angular/material/expansion';
import { ViewTracksComponent } from './view-tracks/view-tracks.component';
import {MatDividerModule} from '@angular/material/divider';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { CloneTrackComponent } from './clone-track/clone-track.component';
import { ExecuteTrackComponent } from './execute-track/execute-track.component';
import { ExecuteTrackNotesComponent } from './execute-track/execute-track-notes/execute-track-notes.component';
import { ExecuteTrackSubComponent } from './execute-track/execute-track-sub/execute-track-sub.component';
import { DetailsComponent } from './execute-track/details/details.component';
import { SummaryComponent } from './execute-track/summary/summary.component';
import {MatSliderModule} from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { ProgressNavComponent } from './execute-track/progress-nav/progress-nav.component';
import { ScenarioSummaryComponent } from './scenario-summary/scenario-summary.component';
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CreateTrackComponent } from './create-track/create-track.component';
import { DecisionComponent } from './create-track/decision/decision.component';
import { ProgressComponent,DiscardCreateTrackDialog } from './create-track/progress/progress.component';
import { ScenarioComponent } from './create-track/scenario/scenario.component';
import { XmlComponent } from './create-track/xml/xml.component';
import { CreateSummaryComponent } from './create-track/create-summary/create-summary.component';
import { CreateDetailsComponent } from './create-track/create-details/create-details.component';
import {MatRadioModule} from '@angular/material/radio';





@NgModule({
  declarations: [
    MIMComponent,
    CloneTrackComponent,
    HomeComponent,
    TracksComponent,
    TrackSummaryComponent,
    LeftNavigationComponent,
    RecentTracksComponent,
    ViewTracksComponent,
    ExecuteTrackComponent,
    ExecuteTrackNotesComponent,
    ExecuteTrackSubComponent,
    DetailsComponent,
    SummaryComponent,
    ProgressNavComponent,
    ScenarioSummaryComponent,
    CreateTrackComponent,
    DecisionComponent,
    ProgressComponent,
    ScenarioComponent,
    XmlComponent,
    CreateSummaryComponent,
    DiscardCreateTrackDialog,
    CreateDetailsComponent
  ],

  imports: [
    CommonModule,
    MIMRoutingModule,
    MatDividerModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ChartsModule,
    MatTableModule,
    MatCarouselModule.forRoot(),
    MatExpansionModule,
    MatSliderModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatRadioModule,


    ],
  exports:[TracksComponent,],

    providers: [CdkColumnDef, TrackDetailsService],
})
export class MIMModule { }
