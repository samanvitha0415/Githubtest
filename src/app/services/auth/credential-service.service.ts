
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CredentialServiceService {
    playLoad: any;
    isLoggedin = new BehaviorSubject<boolean>(false);

    constructor() { }
}
