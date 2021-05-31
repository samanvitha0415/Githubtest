import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialServiceService } from './services/auth/credential-service.service';
import { LoginAuthService } from './services/auth/login-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  IsLoggedIn = false;
  logoutNotificationPopUp = false;
  oneMin = 60000; // 1 min
  setInter: any;
  setInter2: any;
  warningInterval: any;

  constructor(private _router: Router, private apiSer: LoginAuthService,
    private credService: CredentialServiceService) { }

  ngOnInit() {
    this.credService.isLoggedin.subscribe((d) => {
      this.onLoggedIn(d);
    });
    this.apiSer._logOut.subscribe((val) => {
      this.onLogout(val);
    });
  }


  onLoggedIn(e: any) {
    this.IsLoggedIn = e;
    if (this.IsLoggedIn) {
      //Reset Timer every login
      clearInterval(this.setInter);
      this.startTimer();
    }
  }

  onLogout(log: any) {
    if (log) {
      this.apiSer.logOut().subscribe(
        res => { console.log('HTTP response', res); this.cancelToken(); },
        err => { console.log('HTTP Error', err); this.cancelToken(); }
      );
    }
  }

  startTimer() {
    this.setInter = setInterval(() => {
      this.logoutNotificationPopUp = true;
      this.executeTimer2();
    }, this.oneMin * 55);
  }

  executeTimer2() {
    this.setInter2 = setInterval(() => {
      clearInterval(this.setInter);
      clearInterval(this.setInter2);
      this.logoutNotificationPopUp = false;
      this.credService.isLoggedin.next(false);
    }, this.oneMin * 2);
  }

  refreshToken() {
    this.logoutNotificationPopUp = false;
    clearInterval(this.setInter);
    clearInterval(this.setInter2);
    this.apiSer.logIn(this.credService.playLoad).subscribe(data => {
      // console.log(data);
      // data = JSON.parse(data);

      if (data) {
        window.localStorage.setItem('Authorization', data.token);
        this.startTimer();
      } else {
        alert('server Error/ Connection issue');
      }
    },
      error => {
        alert('server Error/ Connection issue');
      });
  }

  cancelToken() {
    clearInterval(this.setInter);
    clearInterval(this.setInter2);
    this.logoutNotificationPopUp = false;
    this.credService.isLoggedin.next(false);
    window.localStorage.removeItem('Authorization');
    this.onLoggedIn(false);
  }
}
