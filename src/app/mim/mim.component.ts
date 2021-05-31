import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mim',
  templateUrl: './mim.component.html',
  styleUrls: ['./mim.component.scss']
})
export class MIMComponent implements OnInit {

  constructor(public router: Router){

  }

  public leftnav!:string;

  ngOnInit(): void {
    this.leftnav='closed';
  }
  openLeftnav(){
    this.leftnav='open';
      }
  closeLeftnav(){
    this.leftnav='closed';
    
  }
}