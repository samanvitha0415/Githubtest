import { Component, OnInit } from '@angular/core';
import * as converter from 'xml-js';
import { MatTab } from '../../../../../../node_modules//@angular/material/tabs';

@Component({
  selector: 'app-xml-edit',
  templateUrl: './xml-edit.component.html',
  styleUrls: ['./xml-edit.component.scss']
})
export class XmlEditComponent implements OnInit {


  editTrack = false;
  xmlFileName: string = "";
  xmlFile: any;
  textFieldKeys: string[] = [];
  tabKeys: string[] = [];
  keys: string[] = [];
  rootKey: string = "";
  tableView: boolean = true;
  editorOptions = { theme: 'vs-dark', language: 'xml' };
  showPlainXML = false;
  code: string = `
  <BC-Track-Template>
   <templVersion>5.3.1</templVersion>
   <goals>
    <BC-Track-Template-Goal>
     <name>min_5yrs_ncl</name>
     <label>Min 5yrs NCL</label>
     <description/>
     <dir>MIN</dir>
     <metric>m5yrs_ncl</metric>
    </BC-Track-Template-Goal>
    <BC-Track-Template-Goal>
     <name>min_yr3_ncl</name>
     <label>Min yr3 NCL</label>
     <description/>
     <dir>MIN</dir>
     <metric>myr3_ncl</metric>
    </BC-Track-Template-Goal>
    <BC-Track-Template-Goal>
     <name>min_yr2_ncl</name>
     <label>Min yr2 NCL</label>
     <description/>
     <dir>MIN</dir>
     <metric>myr2_ncl</metric>
    </BC-Track-Template-Goal>
   </goals>
   <promoTemplates/>
   <maxPromoPerPersonName>maxPromoPerPerson</maxPromoPerPersonName>
   <maxPromoPerHouseholdName>maxPromoPerHousehold</maxPromoPerHouseholdName>
   <maxOffersPerPromoName>maxOffersPerPromo</maxOffersPerPromoName>
  </BC-Track-Template>`;
  data: any;
  showXMLEditor: boolean = false;

  ngOnInit(): void {
  }

  uploadXML($event: any) {
    this.xmlFile = $event.target.files[0];
    this.xmlFileName = this.xmlFile.name;
  }

  tabClick($event: any) {
    if ($event.index) {
      this.showPlainXML = true;
    }
  }

  editXML() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let xml: any = fileReader.result;
      let result1 = converter.xml2json(xml, { compact: true, spaces: 2 });
      this.data = JSON.parse(result1);
      this.onNewData();
      this.showXMLEditor = true;
    }
    fileReader.readAsText(this.xmlFile);
  }

  onNewData() {
    this.textFieldKeys = [];
    this.tabKeys = [];
    this.rootKey = Object.keys(this.data)[0];
    this.keys = Object.keys(this.data[this.rootKey])
    this.keys.forEach(key => {
      if (!!this.data[this.rootKey][key]._text)
        this.textFieldKeys.push(key)
      else if (Object.keys(this.data[this.rootKey][key]).length)
        this.tabKeys.push(key);
    });
  }

  getTableHeaders(key: string) {
    let tableKey = Object.keys(this.data[this.rootKey][key])[0];
    return Object.keys(this.data[this.rootKey][key][tableKey][0])
  }

  getTableValues(key: string) {
    let tableKey = Object.keys(this.data[this.rootKey][key])[0];
    return this.data[this.rootKey][key][tableKey]
  }

  toXML() {
    this.code = converter.json2xml(this.data, { compact: true, spaces: 2 });
    this.tableView = false;
  }

  toTable() {
    this.data = JSON.parse(converter.xml2json(this.code, { compact: true, spaces: 2 }));
    this.onNewData();
    this.tableView = true;
  }



}
