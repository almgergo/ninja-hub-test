import {Component, OnInit} from '@angular/core';

export interface TableData<T> {
  // header: TableRow<string>;
  columns: TableColumn<T>[];
}

// interface TableRow<T> {
//   data: T[];
// }

interface TableColumn<T> {
  name: string;
  data: T[];
}

@Component({
  selector: 'app-hub-table',
  templateUrl: './hub-table.component.html',
  styleUrls: ['./hub-table.component.css']
})
export class HubTableComponent implements OnInit {
  activeColumns: string[] = ['test', 'mariska', 'victor'];

  constructor() {}

  ngOnInit() {}
}
