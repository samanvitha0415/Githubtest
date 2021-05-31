import { Component, OnInit } from '@angular/core';
import * as converter from 'xml-js';
import { MatDialog } from '@angular/material/dialog';
import { XmlEditComponent } from './xml-edit/xml-edit.component';
import { CreateTrackService } from '../../services/create-track.service';
import { first } from 'rxjs/operators';

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
  }

  constructor(
    public dialog: MatDialog,
    public createTrackService: CreateTrackService
  ) { }

  uploadXML($event: any) {
    this.errorMessages.clear();
    this.xmlFile = $event.target.files[0];
    this.xmlFileName = this.xmlFile.name;
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      let xml: any = fileReader.result;
      let result1 = converter.xml2json(xml, { compact: true, spaces: 2 });
      this.data = JSON.parse(result1);
      this.onNewData();
    }
    fileReader.readAsText(this.xmlFile);
  }

  editXML() {
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
        width: "100%",
        height: "90%",
        data: { fileName: this.xmlFileName, xml: this.data },
        disableClose: true
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.data = result;
      this.onNewData();
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
      let xml = converter.json2xml(this.data, { compact: true, spaces: 2 });
      this.createTrackService.saveXMLFile(xml, this.xmlFileName)
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
