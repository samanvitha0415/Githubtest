import { Component, OnInit } from '@angular/core';
import * as converter from 'xml-js';
import { MatDialog } from '../../../../../node_modules/@angular/material/dialog';
import { XmlEditComponent } from './xml-edit/xml-edit.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateTrackService } from '../../services/create-track/create-track.service';
import { first } from '../../../../../node_modules/rxjs/operators';

@Component({
  selector: 'app-xml',
  templateUrl: './xml.component.html',
  styleUrls: ['./xml.component.scss']
})
export class XmlComponent implements OnInit {

  editTrack = false;
  xmlFileName: string = "";
  xmlFile: any;
  textFieldKeys: string[] = [];
  tabKeys: string[] = [];
  keys: string[] = [];
  rootKey: string = "";
  tableView: boolean = true;
  editorOptions = { theme: 'vs-dark', language: 'xml' };
  code: string = '';
  data: any;
  showXMLEditor: boolean = false;
  errorMessages: Map<string, string> = new Map<string, string>();

  ngOnInit(): void {
    // If user clicks back from summary step we get the file name value to display on page
    // from service where it is saved when we upload file
    // There are other scenarios to consider later where we wont want this, bur for now this was requested.
    this.xmlFileName = this.createTrackService.getxmlFileName();
  }

  constructor(
    public dialog: MatDialog,
    public createTrackService: CreateTrackService
  ) { }

  uploadXML($event: any) {
    this.errorMessages.clear();
    this.xmlFile = $event.target.files[0];
    this.xmlFileName = this.xmlFile.name;
  }

  editXML() {
    // let fileReader = new FileReader();
    // fileReader.onload = (e) => {
    //   let xml: any = fileReader.result;
    //   let result1 = converter.xml2json(xml, { compact: true, spaces: 2 });
    //   this.data = JSON.parse(result1);
    //   this.onNewData();
    //   this.showXMLEditor = true;
    // }
    // fileReader.readAsText(this.xmlFile);

    this.showXMLEditor = true;

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

  edit() {
    const dialogRef = this.dialog.open(XmlEditComponent,
      {
        width: "80%",
        height: "90%"
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  nextBtnClickedEvent() {
    this.validateCreateTrackDetails();
  }

  validateCreateTrackDetails() {
    this.errorMessages.clear();

    if (!this.xmlFile || this.xmlFile == '') {
      this.errorMessages.set('xmlFile', 'Please Choose an XML File');
    }

    if (this.errorMessages.size == 0) {
      this.createTrackService.saveXMLFile(this.xmlFile)
      .pipe(first())
      .subscribe((res: any) => {
        this.createTrackService.xmlTemplateId = res;
      });
      this.createTrackService.setIsTrackValidated(true);
    } else {
      this.createTrackService.setIsTrackValidated(false);
    }
  }


}
