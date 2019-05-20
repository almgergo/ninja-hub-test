import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {TableHeader} from '../../model/TableHeader';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {faWrench} from '@fortawesome/free-solid-svg-icons';
import {moveItemInArray} from '@angular/cdk/drag-drop';

const TestData: any[] = [
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

  @ViewChild('table', {read: ElementRef}) table: ElementRef;
  @ViewChild('header', {read: ElementRef}) header: ElementRef;
  @ViewChildren('checkbox', {read: ElementRef}) checkbox: ElementRef;
  @ViewChildren('headerColumn', {read: ElementRef}) headerColumn: ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  draggedItem: number;

  wrench = faWrench;

  // animation timeout
  displacement: string;
  displacementCooldown: boolean;

  // for mat table
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  // header handling
  selectionHeader = new TableHeader('select', true);
  headers: TableHeader[];
  tempHeaders: TableHeader[];
  // return the currently active headers
  get displayedColumns(): string[] {
    return this.headers.filter(h => h.active).map(h => h.name);
  }

  get columns(): string[] {
    return [this.selectionHeader.name].concat(this.displayedColumns);
  }

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
  checkboxLabel(row?: any): string {
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
    this.tempHeaders = this.headers;
  }

  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  drag(col: string) {
    const index = this.tempHeaders.findIndex(h => h.name === col);
    if (this.draggedItem !== index) {
      moveItemInArray(this.tempHeaders, this.draggedItem, index);
      this.draggedItem = index;
    }
  }

  dragStart(col: string) {
    this.draggedItem = this.headers.findIndex(h => h.name === col);
    this.tempHeaders = [...this.headers];
  }

  headerStyle(colname: string) {
    const style = {};
    this.addColWidth(style);
    this.addDisplacement(style, colname);
    return style;
  }

  bodyStyle(colname: string) {
    const style = {};
    this.addColWidth(style);
    this.addDisplacement(style, colname);
    return style;
  }

  private addColWidth(style: {}) {
    style['width.px'] = this.getColWidthPx();
  }

  dragEnd() {
    this.headers = this.tempHeaders;
  }

  private getColWidthPx(): number {
    let paddingRight = 0;
    if (this.headerColumn) {
      paddingRight = window
        .getComputedStyle(this.headerColumn.last.nativeElement, null)
        .paddingRight.split('px')[0];
    }

    return (
      (this.table.nativeElement.offsetWidth -
        paddingRight -
        (this.checkbox ? this.checkbox.first.nativeElement.offsetWidth : 0)) /
      this.displayedColumns.length
    );
  }

  private addDisplacement(style: {}, colname: string) {
  //   if (!this.displacement || !this.displacementCooldown) {
  //
  //     this.displacement = `translateX(${this.getColWidthPx()}px)`;
  //     this.displacementCooldown = true;
  //     console.log({displacement: this.displacement});
  //     setTimeout(() => (this.displacementCooldown = false), 100);
  //   }
  //
  //   const multiplier =
  //     this.tempHeaders.findIndex(th => th.name === colname) -
  //     this.headers.findIndex(h => h.name === colname);
  //   style['transform'] = this.displacement;
  // }
}
