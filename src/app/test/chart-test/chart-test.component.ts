import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {TestData2, TestData2If, WeighingData} from '../data/test.data';
import {MatSelectChange} from '@angular/material';

interface PlottableData {
  t: string | Date;
  y: number;
}

@Component({
  selector: 'app-chart-test',
  templateUrl: './chart-test.component.html',
  styleUrls: ['./chart-test.component.scss']
})
export class ChartTestComponent implements OnInit {
  @ViewChild('lineChart') private chartRef;
  chart: any;

  static get testData(): TestData2If[] {
    return TestData2;
  }

  weighings: Map<string, WeighingData[]> = new Map();
  averages: PlottableData[];

  constructor() {}

  ngOnInit() {
    this.parseTestData();
    this.calculateAverage();
    this.createChart([], []);
  }

  private parseTestData() {
    ChartTestComponent.testData.forEach(td => {
      const weighingData: WeighingData[] = Object.keys(td)
        .filter(key => typeof td[key] === 'number')
        .map(key => ({
          weight: td[key],
          animalId: td['Borjú száma'],
          date: this.parseDate(key)
        }))
        .filter(
          w =>
            // remove invalid date fields
            Object.prototype.toString.call(w.date) === '[object Date]' &&
            !isNaN(w.date.getTime())
        );

      this.weighings.set(td['Borjú száma'], weighingData);
    });

    console.log({weighings: this.weighings});
  }

  private parseDate(key: string) {
    const parts: string[] = key.split('.');
    return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }

  private calculateAverage() {
    const averages: Map<number, {sum: number; count: number}> = new Map();
    for (const weighings of Array.from(this.weighings.values())) {
      weighings.forEach(w => {
        const value = averages.get(w.date.getTime());
        if (value) {
          averages.set(w.date.getTime(), {
            sum: value.sum + w.weight,
            count: value.count + 1
          });
        } else {
          averages.set(w.date.getTime(), {sum: w.weight, count: 1});
        }
      });
    }
    this.averages = Array.from(averages.entries()).map(([key, value]) => {
      return {t: new Date(key), y: value.sum / value.count};
    });
  }

  private createChart(labels: string[], dataPoints: any[]) {
    return (this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'line',
      data: {
        labels: labels, // your labels array
        datasets: [
          {
            data: dataPoints,
            label: 'cattle data',
            backgroundColor: ['rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(255, 99, 132, 1)']
          }
        ]
      },
      options: {
        animation: {
          easing: 'easeOutQuad',
          duration: 400
        },
        legend: {
          display: true,
          position: 'right'
        },
        hover: {
          mode: 'index'
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'month'
              },
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
    const weighings: WeighingData[] = event.value;

    const plottableData = weighings.map(w => ({t: w.date, y: w.weight}));

    console.log({labels: weighings.map(w => w.date), plottable: plottableData});

    // this.createChart(weighings.map(w => w.date.toString()), plottableData);

    this.chart.data.datasets = [
      {
        data: plottableData,
        label: 'cattle data',
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)']
      },
      {
        data: this.averages,
        label: 'average',
        backgroundColor: ['rgba(0, 99, 132, 0.2)'],
        borderColor: ['rgba(0, 99, 132, 1)']
      }
    ];
    this.chart.update();
    // this.createChart([], [{t: new Date(), y: 10}, {t: new Date(), y: 15}]);
    // this.chart.data.datasets = [];
    // this.chart.labels = weighings
    //   .filter(
    //     w =>
    //       Object.prototype.toString.call(w.date) === '[object Date]' &&
    //       !isNaN(w.date.getTime())
    //   )
    //   .map(w => w.date);
    // this.chart.data.datasets.push({
    //   data: plottableData,
    //   borderColor: '#00AEFF',
    //   fill: false
    // });
    // this.chart.update();
  }
}
