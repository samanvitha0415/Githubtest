import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject, BehaviorSubject, Subject } from '../../../../../node_modules/rxjs';
import { first } from '../../../../../node_modules/rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CreateTrackService {
    trackId: string = "";
    campaigns: any;
    trackName: string = "Track Name";
    xmlFileName: string = ""
    scenarioName: string = "Scenario Name";
    scenarioId = "";
    scenarioFileName: string = "";
    optimizerObjective: string = "";
    sampleSize: number = 0;
    campaignBudget: number = 0;
    decisionFileId: number = 0;
    xmlTemplateId: number = 0;
    cannibalizationRules: any[] = [];
    selectedCloneScenario: string[] = [];
    decisionVariableFile: any;
    $selectedCampaign$: BehaviorSubject<any> = new BehaviorSubject(null);
    $selectedDatasets$: BehaviorSubject<any> = new BehaviorSubject([]);
    $isTrackValidated$: Subject<boolean> = new Subject<boolean>();
    selectedCampaignName: string = "";
    type: string = "";
    programDataSets: Map<string, string[]> = new Map<string, string[]>();
    dataSets: string[] = [];
    $decisionVariableKeys$: BehaviorSubject<any> = new BehaviorSubject([]);
    $decisionVariableColumnNames$: BehaviorSubject<any> = new BehaviorSubject([]);
    decisionVariable: any = {};

    constructor(private http: HttpClient) { }

    // getTrack(id: string) {
    //     return this.http.get( environment.apiURL +
    //          "/v1/data/crossprogram/optimizer/campaigns/retrieve");
    // }
    reset() {
        this.campaigns = [];
        this.trackName = "Track Name";
        this.trackId = "";
        this.scenarioName = "Scenario Name";
        this.optimizerObjective = "";
        this.sampleSize = 0;
        this.campaignBudget = 0;
        this.decisionFileId = 0;
        this.xmlTemplateId = 0;
        this.cannibalizationRules = [];
        this.type = "";
        this.decisionVariableFile = null;
        this.$selectedCampaign$.next(null);
        this.$selectedDatasets$.next([]);
        this.selectedCampaignName = "";
        this.scenarioId = ""
        this.selectedCloneScenario = [];
    }
    getCampaigns() {
        //  return this.http.get("/api/v1/data/crossprogram/optimizer/campaigns/retrieve");
        return this.http.get("assets/data/mimuser/retrieve_campaigns.json");
    }

    getDecisionVariables() {
        if (this.selectedCloneScenario.length) {
            console.log("Scenario Id: ", this.selectedCloneScenario[0]);
            // this.http.get(
            //     "/api/v1/data/crossprogram/optimizer/scenario/decisionvariable/retrieve?scenarioIdList="
            //     + this.selectedCloneScenario[0]
            // )
            this.http.get("assets/data/mimuser/decisionvariable_retrieve_by_id.json")
                .pipe(first())
                .subscribe((res: any) => {
                    this.decisionVariable = JSON.parse(res[0].filedata);
                    console.log(res);
                    let keys = Object.keys(this.decisionVariable);
                    this.$decisionVariableKeys$.next(keys);
                    this.$decisionVariableColumnNames$.next(Object.keys(this.decisionVariable[keys[0]]));
                });
        }
        else {
            // this.http.get(
            //     "/kpi/Flex_Loan_DecisionOption_SPR_mailelig.csv/ECM_FLXLOAN_fev20_20.xml"
            // )
            //     .pipe(first())
            //     .subscribe((res: any) => {
            this.decisionVariable = JSON.parse(`{\"contact_0\":{\"MAX Offers\":\"\",
                \"MAx year 3 NCL\":\"\",\"MIN Offers\":\"\",\"Max 5yrs PV\":\"\",\"Max 5yrs ncl\":\"\",
                \"Max 5yrs pce\":\"\",\"Max EBIT 5yrs\":\"\",\"Max Tot CPP\":\"\",\"Max Total Bal\":\"\",
                \"Max loan amt\":\"\",\"Max tot interest\":\"\",\"Max year 2 NCL\":\"\",
                \"Max year2 pctage NCL\":\"\",\"Max year3 pctage NCL\":\"\",\"Max_wgt_avg_apr\":\"\",
                \"Min 5yrs PV\":\"\",\"Min 5yrs ncl\":\"\",\"Min 5yrs pce\":\"\",\"Min EBIT 5yrs\":\"\",
                \"Min Total Bal\":\"\",\"Min Year 2 NCL\":\"\",\"Min loan amt\":\"\",
                \"Min tot interest\":\"\",\"Min year 3 NCL\":\"\",\"Min_wgt_avg_apr\":\"\"},
                \"contact_1\":{\"MAX Offers\":\"\",\"MAx year 3 NCL\":\"\",\"MIN Offers\":\"\",
                \"Max 5yrs PV\":\"\",\"Max 5yrs ncl\":\"\",\"Max 5yrs pce\":\"\",
                \"Max EBIT 5yrs\":\"\",\"Max Tot CPP\":\"\",\"Max Total Bal\":\"\",
                \"Max loan amt\":\"\",\"Max tot interest\":\"\",\"Max year 2 NCL\":\"\",
                \"Max year2 pctage NCL\":\"\",\"Max year3 pctage NCL\":\"\",\"Max_wgt_avg_apr\":\"\",
                \"Min 5yrs PV\":\"\",\"Min 5yrs ncl\":\"\",\"Min 5yrs pce\":\"\",\"Min EBIT 5yrs\":\"\",
                \"Min Total Bal\":\"\",\"Min Year 2 NCL\":\"\",\"Min loan amt\":\"\",
                \"Min tot interest\":\"\",\"Min year 3 NCL\":\"\",\"Min_wgt_avg_apr\":\"\"},
                \"contact_2\":{\"MAX Offers\":\"\",\"MAx year 3 NCL\":\"\",\"MIN Offers\":\"\",
                \"Max 5yrs PV\":\"\",\"Max 5yrs ncl\":\"\",\"Max 5yrs pce\":\"\",
                \"Max EBIT 5yrs\":\"\",\"Max Tot CPP\":\"\",\"Max Total Bal\":\"\",\"Max loan amt\":\"\",
                \"Max tot interest\":\"\",\"Max year 2 NCL\":\"\",\"Max year2 pctage NCL\":\"\",
                \"Max year3 pctage NCL\":\"\",\"Max_wgt_avg_apr\":\"\",\"Min 5yrs PV\":\"\",
                \"Min 5yrs ncl\":\"\",\"Min 5yrs pce\":\"\",\"Min EBIT 5yrs\":\"\",\"Min Total Bal\":\"\",
                \"Min Year 2 NCL\":\"\",\"Min loan amt\":\"\",\"Min tot interest\":\"\",
                \"Min year 3 NCL\":\"\",\"Min_wgt_avg_apr\":\"\"},\"contact_3\":{\"MAX Offers\":\"\",
                \"MAx year 3 NCL\":\"\",\"MIN Offers\":\"\",\"Max 5yrs PV\":\"\",\"Max 5yrs ncl\":\"\",
                \"Max 5yrs pce\":\"\",\"Max EBIT 5yrs\":\"\",\"Max Tot CPP\":\"\",\"Max Total Bal\":\"\",\
                "Max loan amt\":\"\",\"Max tot interest\":\"\",\"Max year 2 NCL\":\"\",
                \"Max year2 pctage NCL\":\"\",\"Max year3 pctage NCL\":\"\",\"Max_wgt_avg_apr\":\"\",
                \"Min 5yrs PV\":\"\",\"Min 5yrs ncl\":\"\",\"Min 5yrs pce\":\"\",\"Min EBIT 5yrs\":\"\",
                \"Min Total Bal\":\"\",\"Min Year 2 NCL\":\"\",\"Min loan amt\":\"\",\"Min tot interest\":\"\",
                \"Min year 3 NCL\":\"\",\"Min_wgt_avg_apr\":\"\"}}`);
            let keys = Object.keys(this.decisionVariable);
            this.$decisionVariableKeys$.next(keys);
            this.$decisionVariableColumnNames$.next(Object.keys(this.decisionVariable[keys[0]]));
        }
        // } else {
        //     this.http.get(
        //         "/kpi/Flex_Loan_DecisionOption_SPR_mailelig.csv/ECM_FLXLOAN_fev20_20.xml"
        //     )
        //         .pipe(first())
        //         .subscribe((res: any) => {
        //             this.decisionVariableFile = new File([JSON.stringify(res)], "DecisionVariable.json", {
        //                 type: "application/json",
        //             });
        //         });
        // }
    }

    saveDecisionFile(file: any) {
        const formData: FormData = new FormData();
        this.scenarioFileName = file.name;
        formData.append('decisionFile', file, file.name);
        return this.http.post("/api/v1/data/crossprogram/optimizer/file/decision/save", formData);
    }

    getScenarioFileName() {
        return this.scenarioFileName;
    }


    saveXMLFile(file: any) {
        const formData: FormData = new FormData();
        this.xmlFileName = file.name;
        formData.append('xmlFile', file, file.name);
        return this.http.post("/api/v1/data/crossprogram/optimizer/file/xmltemplate/save", formData);
    }

    getxmlFileName() {
        return this.xmlFileName;
    }

    addProgramDatasetSelected(dataSet: string, programName: string) {
        this.dataSets = [];
        if (this.programDataSets.has(programName)) {
            this.dataSets = this.programDataSets.get(programName) || [];
            this.dataSets.push(dataSet);
        } else {
            this.dataSets.push(dataSet);
        }
        this.programDataSets.set(programName, this.dataSets);
        console.log(this.programDataSets);
    }

    deleteProgramDatasetSelected(dataSet: string, programName: string) {
        this.dataSets = [];
        if (this.programDataSets.has(programName)) {
            this.dataSets = this.programDataSets.get(programName) || [];
            const index = this.dataSets.indexOf(dataSet);
            if (index > -1)
                this.dataSets.splice(index, 1);

            if (this.dataSets.length == 0) {
                this.programDataSets.delete(programName);
            } else {
                this.programDataSets.set(programName, this.dataSets);
            }
        }

        console.log(this.programDataSets);
    }

    getProgramDatasetSelected() {
        console.log([...this.programDataSets.values()]);
        return this.programDataSets;
    }

    saveTrack() {
        const formData: FormData = new FormData();
        let selectedCannibalization: any[] = [];
        this.cannibalizationRules.forEach((rule: any) => {
            if (rule.checked) {
                selectedCannibalization.push(
                    {
                        "cannibalizationRule": rule.cannibalizationRule,
                        "cannibalizationValue": rule.cannibalizationValue
                    }
                );
            }
        });

        // let campaignDataset: any[] = [];
        // this.$selectedDatasets$.value.forEach((dataSet: any) => {
        //     campaignDataset.push(
        //         {
        //             "datasetName": dataSet,
        //             "sampleSize": this.sampleSize
        //         }
        //     );
        // });

        this.decisionVariableFile = new File([JSON.stringify(this.decisionVariable)], "DecisionVariable.json", {
            type: "application/json",
        });

        formData.append('decisionVariable ', this.decisionVariableFile, this.decisionVariableFile.name);
        let reqData = {
            "trackName": this.trackName,
            "campaignName": this.selectedCampaignName,
            "campaignBudget": this.campaignBudget,
            "overrideCannibalizationInd": selectedCannibalization.length > 0 ? 1 : 0,
            "campaignCannibalization": selectedCannibalization,
            "decisionFileId": this.decisionFileId,
            "xmlTemplateId": this.xmlTemplateId,
            "scenarioName": this.scenarioName,
            "optimizerObjective": this.optimizerObjective,
            "campaignDataset": this.$selectedDatasets$.value
        }

        formData.append('trackRequest', JSON.stringify(reqData));
        return this.http.post("/api/v1/data/crossprogram/optimizer/track/add", formData);
    }

    setIsTrackValidated(isTrackValidated: boolean) {
        this.$isTrackValidated$.next(isTrackValidated);
    }

    getIsTrackValidated() {
        return this.$isTrackValidated$.asObservable();
    }

    addScenario() {
        const formData: FormData = new FormData();
        this.decisionVariableFile = new File([JSON.stringify(this.decisionVariable)], "DecisionVariable.json", {
            type: "application/json",
        });
        formData.append('decisionVarFile', this.decisionVariableFile, this.decisionVariableFile.name);
        let reqData = {
            "scenarioName": this.scenarioName,
            "optimizerObjective": this.optimizerObjective
        }
        formData.append('scenarioRequest', JSON.stringify(reqData));
        return this.http.post("/api/v1/data/crossprogram/optimizer/tracks/" + this.trackId + "/scenario/add", formData);
    }

    submitScenario() {
        return this.http.get("api/v1/data/crossprogram/optimizer/scenario/" + this.scenarioId + "/run");
    }

}
