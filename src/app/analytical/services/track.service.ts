import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TrackService {

    constructor(private http: HttpClient) { }

    getTrack(id: string) {
        return this.http.get( "/api/v1/data/crossprogram/optimizer/tracks/"+ id +"/retrieve");
    }

    invalidateScenario(id: string) {
        return this.http.get("api/v1/data/crossprogram/optimizer/scenario/" + id+ "/invalidate");
    }

}
