import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import { CredentialServiceService } from '../services/auth/credential-service.service';
import { LoginAuthService } from '../services/auth/login-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: Boolean = false;

  constructor(private _router: Router, private formBuilder: FormBuilder, private apiSer: LoginAuthService,
    private credService: CredentialServiceService) {
    this.loginForm = this.formBuilder.group({
      userId: ['', Validators.compose([Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.credService.playLoad = {};
    window.localStorage.removeItem('Authorization');
    this.apiSer._logOut.next(false);
  }

  detectIE() {
    let ua = window.navigator.userAgent;

    let msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    let trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      let rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    let edge = ua.indexOf('Edge/');
    if (edge > 0) {
      // Edge (IE 12+) => return version number
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const encryptedBase64Key = 'b3B0aW1pemVyQDE3NDgyMA==';
    const parsedBase64Key = CryptoJS.enc.Base64.parse(encryptedBase64Key);
    let encryptedData = '';
    const passwordText = this.loginForm.controls.password.value;
    encryptedData = (CryptoJS.AES.encrypt(passwordText,
      parsedBase64Key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })).toString();
    const loginPayLoad = {
      userId: this.loginForm.controls.userId.value + '',
      //password: this.loginForm.controls.password.value + ''
      password: encryptedData + ''
      // password: "Uy4ThtEk6EhT9huFd3KXrQ=="
    };
    console.log(loginPayLoad);
    this.credService.isLoggedin.next(true);
    this._router.navigateByUrl('/mim')

    // this.apiSer.logIn(loginPayLoad).subscribe(data => {
    //   // console.log(data);
    //   // data = JSON.parse(data);

    //   if (data) {
    //     this.credService.playLoad = loginPayLoad;
    //     window.localStorage.setItem('Authorization', data.token);
    //     //        window.localStorage.setItem('userType', data.userType); //
    //     window.localStorage.setItem('userId', loginPayLoad.userId);
    //     window.localStorage.setItem('userType', data.userType);
    //     /* Get the Login user Userdatails */
    //     // this.apiSer.getUserProfile().subscribe(userDataObject => {
    //     //   window.localStorage.setItem('userDetails', JSON.stringify(userDataObject));
    //     // });

    //     // if(data.userType == "ANALYTICAL"){
    //     //   this._router.navigate(['/analytical']);
    //     // }
    //     // if(data.userType == "MIM"){
    //     //   this._router.navigate(['/mim']);
    //     // }


    //     if (data.userType == 'ANALYTICAL') {
    //       this._router.navigateByUrl('/analytical')
    //     } else {
    //       this._router.navigateByUrl('/mim')
    //     }
    //   } else {
    //     this.invalidLogin = true;
    //   }
    // },
    //   error => {
    //     this.invalidLogin = true;
    //   });
  }
}

