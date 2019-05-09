import {Component, OnInit} from '@angular/core';
import {HubTable} from '../model/HubTable';

const TestData: any[][] = [
  ['col1', 'col2', 'random'],
  ['1', 'test', '123'],
  ['992', 'test2', '55.6']
];

@Component({
  selector: 'app-hub-table',
  templateUrl: './hub-table.component.html',
  styleUrls: ['./hub-table.component.scss']
})
export class HubTableComponent implements OnInit {
  table: HubTable;

  constructor() {
    this.table = new HubTable(TestData);
    this.table.header.forEach(h =>
      this.table.changeColumnActivity(h.name, true)
    );
  }

  ngOnInit() {}

  selectColumn(name: string) {}
}
