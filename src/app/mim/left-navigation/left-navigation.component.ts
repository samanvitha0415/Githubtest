import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})
export class LeftNavigationComponent implements OnInit {


  @Input() mim: boolean = false;
routerClass : any='track';
  constructor(private router: Router) { }
  classes = ''
  ngOnInit(): void {
    
  }
 route(address: any){
   this.routerClass = address;

 }
}
