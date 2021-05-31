import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from '../../../../../node_modules/rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExecuteTrackService {
  public selectedScenarios: any[] = [];
  public trackNotes: string = "";
  public trackID: string = "";
  public trackData: any = {};
  public newBudget: number = 0;
  public selectedScenariosFull: any[] = [];

  

  constructor(private http: HttpClient) { }

  getTrackId() {
    return this.trackID;
  }


  setTrackId(number: string) {
    this.trackID = number;
    //this.trackData = this.getTrack(number);

    this.getTrack(number).pipe(first()).subscribe((data:any) => {
      this.trackData = data;
    });  
  }

  getTrack(id: string) {
    // return this.http.get( "/api/v1/data/crossprogram/optimizer/tracks/"+ id +"/retrieve");
    return this.http.get("assets/data/mimuser/viewTrackById.json");
  }

  setScenario(allScenarios: any,trackID: any,newBudget: any){
    let reqData = {
      "trackId": trackID,
      "campaignBudget": newBudget
  };
  // alert(allScenarios + " " + trackID + " " + newBudget);
  //return this.http.get( "/api/v1/data/crossprogram/optimizer/tracks/"+ "7" +"/retrieve");
  return this.http.post("/api/v1/data/crossprogram/optimizer/scenario/" + allScenarios +"/execute", reqData);
  // /v1/data/crossprogram/optimizer/scenario/{scenarioId}/execute
    

  }




  










  // setTrackId(number: any) {
  //   this.trackID = number.name;
  //     // const formData: FormData = new FormData();
  //     // this.xmlFileName = file.name;
  //     // formData.append('xmlFile', file, file.name);
  //     // return this.http.post("/api/v1/data/crossprogram/optimizer/file/xmltemplate/save", formData);
  // }



}
