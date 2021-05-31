import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '../../../../../node_modules/@angular/router';
import { DomSanitizer } from '../../../../../node_modules/@angular/platform-browser';
import * as XLSX from 'xlsx';
import { CreateTrackService } from '../../services/create-track/create-track.service';
import { first } from '../../../../../node_modules/rxjs/operators';

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
    this.numbers = Array(30).fill(0).map((x, i) => i);

    // If user clicks back from summary step we get the file name value to display on page
    // from service where it is saved when we upload file
    // There are other scenarios to consider later where we wont want this, bur for now this was requested.
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
      <style>th, td {
        padding: 15px;
        text-align: left;
        border: 1px solid #ddd;
      }
      tr:nth-child(even) {background-color: #f2f2f2;}
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
