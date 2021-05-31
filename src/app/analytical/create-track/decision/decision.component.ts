import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import * as XLSX from 'xlsx';
import { CreateTrackService } from '../../services/create-track.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss']
})
export class DecisionComponent implements OnInit {

  editTrack = false;
  excelFileName: string = "";
  excelFile: any;
  bodyContents: any = null;
  numbers: any;
  errorMessages: Map<string, string> = new Map<string, string>();

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    public createTrackService: CreateTrackService
  ) { }

  ngOnInit(): void {
    this.numbers = Array(30).fill(0).map((x,i)=>i);
    this.excelFileName = this.createTrackService.getScenarioFileName();
  }

  uploadExcel($event: any) {
    this.errorMessages.clear();
    this.excelFile = $event.target.files[0];
    this.excelFileName = this.excelFile.name;
  }

  editExcel() {
    let workBook: any = null;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = reader.result;
      let htmlData = null;
      workBook = XLSX.read(data, { type: 'binary' });
      let sheets: any[] = [];
      htmlData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        sheets.push(name);
        initial[name] = XLSX.utils.sheet_to_html(sheet);
        return initial;
      }, {});
      this.bodyContents = htmlData[sheets[0]].match(/<body.*?>([\s\S]*)<\/body>/)[1];
      this.bodyContents += `
      <style>
      td {
        font-family: Interstate-Regular;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
        line-height: 24px;
        border: none;
        padding: unset;
        vertical-align: middle;
        min-width: 80px;
      }
      tr {
        height: 64px;
      }
      tr:nth-child(even) {
        background: #FFFFFF;
      }
      tr:nth-child(even), td:nth-child(1) {
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
      }
      tr:nth-child(even), td:nth-last-child(1) {
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      td:nth-child(1) {
        padding-left: 30px;
      }
       </style>
      `
    }
    reader.readAsBinaryString(this.excelFile);
  }

  nextBtnClickedEvent() {
    this.validateCreateTrackDetails();
  }

  validateCreateTrackDetails() {
    this.errorMessages.clear();

    if (!this.excelFile || this.excelFile == '') {
      this.errorMessages.set('excelFile', 'Please Choose an Excel File');
    }

    if (this.errorMessages.size == 0) {
      this.createTrackService.setIsTrackValidated(true);
      this.createTrackService.saveDecisionFile(this.excelFile)
        .pipe(first())
        .subscribe((res: any) => {
          this.createTrackService.decisionFileId = res;
        });
    } else {
      this.createTrackService.setIsTrackValidated(false);
    }
  }


}
