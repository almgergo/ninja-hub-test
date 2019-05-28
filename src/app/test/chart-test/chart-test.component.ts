import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {TestData2, TestData2If, WeighingData} from '../data/test.data';
import {FormBuilder, FormGroup} from '@angular/forms';

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
  static get testData(): TestData2If[] {
    // mock data
    return TestData2;
  }

  constructor(private fb: FormBuilder) {}

  // ref to the chart
  @ViewChild('lineChart') private chartRef;
  chart: any;

  // weighing data in a map with cattleId as key
  weighings: Map<string, WeighingData[]> = new Map();
  // average of weighing data
  averages: PlottableData[];

  filterForm: FormGroup;

  static parseDate(key: string) {
    const parts: string[] = key.split('.');
    return new Date(+parts[0], +parts[1] - 1, +parts[2]);
  }

  ngOnInit() {
    // create the formGroup that will hold the filters for the chart
    this.createFilterForm();
    // parse test data into model
    this.parseTestData();
    // calculate the average values from all data
    this.calculateAverage();
    // create the empty chart
    this.createChart([], []);

    // select the first value from the data
    this.filterForm
      .get('selectedAnimal')
      .setValue(this.weighings.values().next().value);
  }

  private createFilterForm() {
    // create the form used for filtering
    this.filterForm = this.fb.group({
      selectedAnimal: [],
      minDate: null,
      maxDate: null
    });

    // add listener to selectedAnimal to update filtering on change
    this.filterForm
      .get('selectedAnimal')
      .valueChanges.subscribe(() => this.updateFiltering());
  }

  private parseTestData() {
    ChartTestComponent.testData.forEach(td => {
      const weighingData: WeighingData[] = Object.keys(td)
        .filter(key => typeof td[key] === 'number')
        .map(key => ({
          weight: td[key],
          animalId: td['Borjú száma'],
          date: ChartTestComponent.parseDate(key)
        }))
        .filter(
          w =>
            // remove invalid date fields
            Object.prototype.toString.call(w.date) === '[object Date]' &&
            !isNaN(w.date.getTime())
        );

      this.weighings.set(td['Borjú száma'], weighingData);
    });
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
        datasets: []
      },
      options: {
        animation: {
          easing: 'easeOutQuad',
          duration: 400
        },
        legend: {
          display: true,
          position: 'top'
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

  updateFiltering() {
    const weighings: WeighingData[] = this.filterForm.get('selectedAnimal')
      .value;
    if (!weighings) {
      return;
    }
    const plottableData = weighings
      .filter(w => this.filterDateInterval(w, 'date'))
      .map(w => ({t: w.date, y: w.weight}));

    this.chart.data.datasets = [
      {
        data: plottableData,
        label: 'cattle data',
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        pointBackgroundColor: 'rgba(255, 99, 132, 0.2)',
        pointBorderColor: 'rgba(255, 99, 132, 0.8)',
        pointRadius: 10,
        pointHoverRadius: 12
      },
      {
        data: this.averages.filter(a => this.filterDateInterval(a, 't')),
        label: 'average',
        backgroundColor: ['rgba(0, 99, 132, 0.2)'],
        borderColor: ['rgba(0, 99, 132, 1)'],
        pointBackgroundColor: 'rgba(0, 99, 132, 0.2)',
        pointBorderColor: 'rgba(0, 99, 132, 0.8)',
        pointRadius: 5,
        pointHoverRadius: 6,
        fill: false
      }
    ];
    this.chart.update();
  }

  private filterDateInterval(weighingData: any, dateField: string) {
    let keep = true;
    if (this.filterForm.get('minDate').value) {
      keep =
        keep && this.filterForm.get('minDate').value <= weighingData[dateField];
    }
    if (this.filterForm.get('maxDate').value) {
      keep =
        keep && this.filterForm.get('maxDate').value >= weighingData[dateField];
    }
    return keep;
  }
}
