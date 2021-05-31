import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }

    getAnalyticalData() {
        return this.http.get("/api/v1/data/crossprogram/optimizer/analytical/dashboard/retrieve");
    }

    getTracks() {
        return this.http.get("/api/v1/data/crossprogram/optimizer/analytical/tracks/retrieve");
    }
}
