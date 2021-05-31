import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ViewtracklistService {
  private viewTracks = new BehaviorSubject<string>('all');
  viewName = this.viewTracks.asObservable();
  constructor(private http: HttpClient) {}

  getTrackDtsl() {
    return this.http.get("assets/data/viewTrackList.json");
  }
  //For filtering tracks
  sortTrack(viewName: string){
    this.viewTracks.next(viewName);
  }
}
