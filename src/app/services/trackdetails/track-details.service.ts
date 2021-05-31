import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class TrackDetailsService {
  private viewTracks = new BehaviorSubject<string>("all");
  viewName = this.viewTracks.asObservable();
  constructor(private http: HttpClient) {}

  getTrackDtsl() {
    return this.http.get("assets/data/trackDataList.json");
  }

  getViewTracks() {
    return this.http.get("assets/data/viewTrackList.json");
  }
  //For filtering tracks
  sortTrack(viewName: string) {
    this.viewTracks.next(viewName);
  }
}
