import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ChartType, Chart } from "chart.js";

@Component({
  selector: "app-doughnut-chart",
  templateUrl: "./doughnut-chart.component.html",
  styleUrls: ["./doughnut-chart.component.scss"]
})
export class DoughnutChartComponent {
  chart: any;
  @ViewChild("dChart", { static: false }) dChart!: ElementRef;
  @Input() jsonArray: any = [25, 15, 20, 15, 30];
  @Input() chartLabels: any = [
    "label 1",
    "label 2",
    "label 3",
    "label 4",
    "label 5"
  ];
  @Input() cutOut: number = 75;
  @Input() backgroundColors: any = [
    "#E15D44",
    "#55B4B0",
    "#DFCFBE",
    "#9B2335",
    "#5B5EA6"
  ];

  ngAfterViewInit() {
    let cvs: any;
    cvs = this.dChart.nativeElement;
    this.chart = new Chart(cvs, {
      type: "doughnut",
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            data: this.jsonArray,
            backgroundColor: this.backgroundColors,
            fill: false,
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: false,
        legend: {
          display: false
        },
        cutoutPercentage: this.cutOut,
        tooltips: {
          enabled: true
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        }
      }
    });
  }
}
