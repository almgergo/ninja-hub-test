import {Component, OnInit, ViewChild} from '@angular/core';
import {TableHeader} from '../model/TableHeader';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

interface TestDataType {
  col1: string;
  col2: string;
  random: number;
  negyedik: Date;
}

const TestData: TestDataType[] = [
  {col1: 'col1', col2: 'col2', random: 1.123, negyedik: new Date(1234)},
  {
    col1: 'col11',
    col2: 'col22',
    random: 123.3123,
    negyedik: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000)
  },

  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col1111',
    col2: 'col222',
    random: 444,
    negyedik: new Date(Math.random() * 5000000000000)
  }
];

@Component({
  selector: 'app-hub-table',
  templateUrl: './hub-table.component.html',
  styleUrls: ['./hub-table.component.scss']
})
export class HubTableComponent implements OnInit {
  dataSource: MatTableDataSource<TestDataType>;

  header: TableHeader[];
  // return the currently active headers
  get displayedColumns(): string[] {
    return this.header.filter(h => h.active).map(h => h.name);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.header = Object.keys(TestData[0]).map(
      key => new TableHeader(key, Math.random() <= 1)
    );

    this.dataSource = new MatTableDataSource(TestData);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  columnsSelected(headers: TableHeader[]) {
    this.header.forEach(
      h =>
        (h.active = headers.some(
          selectedHeader => selectedHeader.name === h.name
        ))
    );
  }

  isNumber(element: any) {
    return typeof element === 'number';
  }

  isDate(element: any) {
    return typeof element.getMonth === 'function';
  }

  isString(element: any) {
    return typeof element === 'string';
  }
}
