import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { tracksURL, dashboardURL } from '../../constants/web.constants';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MimService {
  dashboardData: any;  
  dashboardData$ = new BehaviorSubject({});
  auth_token: any;

  constructor(private http: HttpClient) {
    this.auth_token = window.localStorage.getItem('Authorization');
   }

  getMimHomepageData() {
    // return this.http.get(dashboardURL); 
    return this.http.get("assets/data/mimuser/dashboardTrackRetrieve.json");
    
  }

  
  getTrackListData() {
    return this.http.get("assets/data/mimuser/MIM_TrackList.json");
      // return this.http.get(tracksURL); 
  }


  
}

