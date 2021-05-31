import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TrackService {

    constructor(private http: HttpClient) { }

    getTrack(id: number) {
        //    return this.http.get( "/api/v1/data/crossprogram/optimizer/tracks/"+ id +"/retrieve");
        return this.http.get("assets/data/mimuser/viewTrackById.json");
    }

}
