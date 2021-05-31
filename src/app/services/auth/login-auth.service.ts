import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class LoginAuthService {

    _logOut = new BehaviorSubject<boolean>(false);

    httpHeaderOptions = {
        headers: new HttpHeaders({
            //'client_id': '9f0b193d-cdec-400f-95d3-06d22a04e2af',
            //'channelId': 'CPO',
            'countryCode': 'US',
            'businessCode': 'GCB',
            'Accept': 'application/json',
            'Content-type': 'application/json',
            // 'Connection': 'keep-alive',
            // 'Accept-Encoding': 'gzip, deflate',
            'Cache-control': 'no-cache'
        })
    };

    constructor(private http: HttpClient) { }
    logIn(body: any): Observable<any> {
        return this.http.post('/api/v1/data/crossprogram/optimizer/login/authenticate', body, this.httpHeaderOptions)
            .pipe(map((response) => {
                return response;
            }));
    }

    // Logout functionality
    logOut() {
        return this.http.get('/api/v1/data/optimizer/logout');
    }

    // get User Profile Details
    getUserProfile() {
        return this.http.get('/api/v1/data/optimizer/userProfile');
    }
}
