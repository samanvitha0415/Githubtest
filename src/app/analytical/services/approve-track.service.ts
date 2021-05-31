import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApproveTrackService {

    constructor(private http: HttpClient) { }

    public selectedScenarios: any[] = [];
    public trackNotes: string = "";

    getTracks() {
        return this.http.get("/api/v1/data/crossprogram/optimizer/analytical/tracks/retrieve");
    }

    approveTracks(track: any) {
        let scenarioList: any[] = [];
        this.selectedScenarios.forEach(sce => {
            scenarioList.push(
                {
                    "scenarioId": sce.scenarioId,
                    "priorityOrder": sce.priority
                }
            );
        });
        let reqData = {
            "scenarioList": scenarioList,
            "trackNotes": this.trackNotes
        }

        return this.http.post("/api/v1/data/crossprogram/optimizer/tracks/" + track.trackId +"/approve", reqData);
    }
}
