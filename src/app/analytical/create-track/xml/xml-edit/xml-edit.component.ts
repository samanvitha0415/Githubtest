import { Component, OnInit, Inject } from '@angular/core';
import * as converter from 'xml-js';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  code: string = "";
  showXMLEditor: boolean = false;
  currentIndex: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<XmlEditComponent>
  ) { }

  ngOnInit(): void {
    this.onNewData()
  }

  close() {
    if (this.currentIndex) {
      this.toTable();
    }
    this.dialogRef.close(this.data.xml);
  }

  tabClick($event: any) {
    this.currentIndex = $event.index;
    if ($event.index) {
      this.toXML();
      this.showPlainXML = true;
    }else {
      this.toTable();
    }
  }

  onNewData() {
    this.textFieldKeys = [];
    this.tabKeys = [];
    this.rootKey = Object.keys(this.data.xml)[0];
    this.keys = Object.keys(this.data.xml[this.rootKey])
    this.keys.forEach(key => {
      if (!!this.data.xml[this.rootKey][key]._text)
        this.textFieldKeys.push(key)
      else if (Object.keys(this.data.xml[this.rootKey][key]).length)
        this.tabKeys.push(key);
    });
  }

  getTableHeaders(key: string) {
    let tableKey = Object.keys(this.data.xml[this.rootKey][key])[0];
    return Object.keys(this.data.xml[this.rootKey][key][tableKey][0])
  }

  getTableValues(key: string) {
    let tableKey = Object.keys(this.data.xml[this.rootKey][key])[0];
    return this.data.xml[this.rootKey][key][tableKey]
  }

  toXML() {
    this.code = converter.json2xml(this.data.xml, { compact: true, spaces: 2 });
    this.tableView = false;
  }

  toTable() {
    this.data.xml = JSON.parse(converter.xml2json(this.code, { compact: true, spaces: 2 }));
    this.onNewData();
    this.tableView = true;
  }



}
