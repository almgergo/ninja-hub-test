import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {TestData2, TestData2If} from '../data/test.data';
import {MatSelectChange} from '@angular/material';

const TestData: any[] = [
  {
    x: 1,
    y: 10
  },
  {
    x: 2,
    y: 20
  }
];

@Component({
  selector: 'app-chart-test',
  templateUrl: './chart-test.component.html',
  styleUrls: ['./chart-test.component.scss']
})
export class ChartTestComponent implements OnInit {
  @ViewChild('lineChart') private chartRef;
  chart: any;
  labels = ['2017.11.10', '2018.01.05', '2018.9.10'];
  chartData: any[];
  averageData: any[];
  selectedAnimal: string; // ENAR

  get testData(): TestData2If[] {
    return TestData2;
  }

  constructor() {
    this.selectedAnimal = TestData2[0]['Borjú száma'];
    this.createDataFromAnimal();
    this.createAverageData(TestData2);
    console.log({chartData: this.chartData});
  }

  private createDataFromAnimal() {
    this.chartData = TestData2.filter(
      td => td['Borjú száma'] === this.selectedAnimal
    ).map(td => {
      const animalDatas = [];
      this.labels.forEach(label => animalDatas.push({x: label, y: td[label]}));
      return animalDatas;
    })[0];
  }

  private createAverageData(dataSet: any[]) {
    const sumData = dataSet
      .map(td => {
        return {
          '2017.11.10': +td['2017.11.10'],
          '2018.9.10': +td['2018.9.10'],
          '2018.01.05': +td['2018.01.05']
        };
      })
      .reduce((td1: TestData2If, td2: TestData2If) => {
        return {
          '2017.11.10': td1['2017.11.10'] + td2['2017.11.10'],
          '2018.9.10': td1['2018.9.10'] + td2['2018.9.10'],
          '2018.01.05': td1['2018.01.05'] + td2['2018.01.05']
        };
      });

    Object.keys(sumData).forEach(key => (sumData[key] /= dataSet.length));

    this.averageData = this.labels.map(label => ({
      x: label,
      y: sumData[label]
    }));
    console.log({
      thisaverageData: this.averageData,
      sumData: sumData
    });
  }

  ngOnInit() {
    this.createChart();
  }

  private createChart() {
    return (this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.labels, // your labels array
        datasets: [
          {
            data: this.chartData, // your data array
            borderColor: '#00AEFF',
            fill: false
          },
          {
            data: this.averageData, // your data array
            borderColor: '#FFAE00',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: true
            }
          ],
          yAxes: [
            {
              display: true
            }
          ]
        }
      }
    }));
  }

  selectAnimal(event: MatSelectChange) {
    this.selectedAnimal = event.value['Borjú száma'];
    this.createDataFromAnimal();
    this.chart.data.datasets = [];
    this.chart.data.datasets.push({
      data: this.chartData, // your data array
      borderColor: '#00AEFF',
      fill: false
    });
    this.chart.data.datasets.push({
      data: this.averageData, // your data array
      borderColor: '#FFAE00',
      fill: false
    });
    this.chart.update();
  }
}
