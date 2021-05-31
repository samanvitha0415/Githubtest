import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticalRoutingModule } from './analytical-routing.module';
import { AnalyticalComponent } from './analytical.component';
import { LeftNavigationComponent } from './left-navigation/left-navigation.component';
import { HomeComponent } from './home/home.component';
import { TracksComponent, TrackDialog } from './tracks/tracks.component';
import { TrackSummaryComponent } from './track-summary/track-summary.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { CreateTrackComponent } from './create-track/create-track.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressComponent } from './create-track/progress/progress.component';
import { DetailsComponent } from './create-track/details/details.component';
import { MatSliderModule } from '@angular/material/slider';
import { DecisionComponent } from './create-track/decision/decision.component';
import { XmlComponent } from './create-track/xml/xml.component';
import { ScenarioComponent } from './create-track/scenario/scenario.component';
import { SummaryComponent, DiscardCreateTrackDialog } from './create-track/summary/summary.component';
import { ApproveTrackComponent } from './approve-track/approve-track.component';
import { MatRadioModule } from '@angular/material/radio';
import { ApproveTrackViewComponent } from './approve-track/approve-track-view/approve-track-view.component';
import { MatTableModule } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { ApproveTrackNotesComponent } from './approve-track/approve-track-notes/approve-track-notes.component';
import { ApproveTrackSummaryComponent } from './approve-track/approve-track-summary/approve-track-summary.component';
import { CloneTrackComponent } from './clone-track/clone-track.component';
import { CloneTrackReviewComponent } from './clone-track/clone-track-review/clone-track-review.component';
import { TrackViewComponent, NotesDialog } from './track-view/track-view.component';
import { XmlEditComponent } from './create-track/xml/xml-edit/xml-edit.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [
    AnalyticalComponent,
    LeftNavigationComponent,
    HomeComponent,
    TracksComponent,
    TrackSummaryComponent,
    CreateTrackComponent,
    ProgressComponent,
    DetailsComponent,
    DecisionComponent,
    XmlComponent,
    ScenarioComponent,
    SummaryComponent,
    DiscardCreateTrackDialog,
    ApproveTrackComponent,
    ApproveTrackViewComponent,
    ApproveTrackNotesComponent,
    ApproveTrackSummaryComponent,
    CloneTrackComponent,
    CloneTrackReviewComponent,
    TrackViewComponent,
    XmlEditComponent,
    NotesDialog,
    TrackDialog
  ],
  imports: [
    CommonModule,
    AnalyticalRoutingModule,
    MatTabsModule,
    ChartsModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatExpansionModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatRadioModule,
    MatTableModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [CdkColumnDef]
})
export class AnalyticalModule { }
