import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {AbstractControl} from '@angular/forms';
import {MatSelectChange} from '@angular/material';

const intervals = [
  {
    name: 'Week',
    values: [1, 2, 3]
  },
  {
    name: 'Month',
    values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    name: 'Year',
    values: [1, 2, 3, 4, 5, 6]
  }
];

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  faTimes = faTimes;

  @Input() minDate: AbstractControl;
  @Input() maxDate: AbstractControl;

  @Output() dateChanged: EventEmitter<void> = new EventEmitter();
  @Output() minDateChange: EventEmitter<Date> = new EventEmitter();
  @Output() maxDateChange: EventEmitter<Date> = new EventEmitter();
  selectedInterval: [string, number];

  get intervals() {
    return intervals;
  }

  constructor() {}

  ngOnInit() {
    this.minDate.valueChanges.subscribe(() => this.minDateChanged());
    this.maxDate.valueChanges.subscribe(() => this.maxDateChanged());
  }

  maxDateChanged() {
    this.maxDateChange.emit(this.maxDate.value);
    this.dateChanged.emit();
  }

  minDateChanged() {
    this.minDateChange.emit(this.minDate.value);
    this.dateChanged.emit();
  }

  resetMaxDate(event?: MouseEvent) {
    this.maxDate.setValue(null);
    if (event) {
      event.stopPropagation();
    }
  }

  resetMinDate(event?: MouseEvent) {
    this.minDate.setValue(null);
    this.selectedInterval = null;
    if (event) {
      event.stopPropagation();
    }
  }

  intervalSelected(event: MatSelectChange) {
    console.log({eventValue: event.value});
    const interval: {name: 'Week' | 'Month' | 'Year'; value: number} =
      event.value;
    if (!interval) {
      this.resetMinDate();
    } else {
      const minDate = new Date();
      minDate.setHours(0, 0, 0, 0);

      if (interval.name === 'Week') {
        minDate.setDate(minDate.getDate() - interval.value * 7);
      } else if (interval.name === 'Month') {
        minDate.setMonth(minDate.getMonth() - interval.value);
      } else if (interval.name === 'Year') {
        minDate.setFullYear(minDate.getFullYear() - interval.value);
      }
      // minDate.setFullYear(
      //   minDate.getFullYear() - (interval.Year ? interval.Year : 0),
      //   minDate.getMonth() - (interval.Month ? interval.Month : 0),
      //   minDate.getDate() - (interval.Week ? interval.Week * 7 : 0)
      // );

      this.minDate.setValue(minDate);
    }
  }

  selectInterval(name: string, value: number) {
    console.log(name + ' ' + value);
  }
}
