import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {TableHeader} from '../../model/TableHeader';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {faWrench} from '@fortawesome/free-solid-svg-icons';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

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
  @Input() tableName: string;

  wrench = faWrench;

  dataSource: MatTableDataSource<TestDataType>;
  selection = new SelectionModel<TestDataType>(true, []);

  selectionHeader = new TableHeader('select', true);
  headers: TableHeader[];
  // return the currently active headers
  get displayedColumns(): string[] {
    return this.headers.filter(h => h.active).map(h => h.name);
  }

  get columns(): string[] {
    return [this.selectionHeader.name].concat(this.displayedColumns);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.loadHeader();

    this.dataSource = new MatTableDataSource(TestData);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  columnsSelected(headers: TableHeader[]) {
    this.headers.forEach(
      h =>
        (h.active = headers.some(
          selectedHeader => selectedHeader.name === h.name
        ))
    );

    this.persistHeader();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TestDataType): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
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

  private persistHeader() {
    localStorage.setItem(
      this.tableName + '_header',
      JSON.stringify(this.headers.filter(h => h.active).map(h => h.name))
    );
  }

  private loadHeader() {
    const parsedHeader: string[] = JSON.parse(
      localStorage.getItem(this.tableName + '_header')
    );
    this.headers = Object.keys(TestData[0]).map(
      key =>
        new TableHeader(
          key,
          parsedHeader && parsedHeader.some(ph => ph === key)
        )
    );
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  dropHeader(event: CdkDragDrop<any, any>, column: string) {
    console.log({event: event, column: column});
  }
}
