import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {TableHeader} from '../../model/TableHeader';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {faWrench} from '@fortawesome/free-solid-svg-icons';
import {moveItemInArray} from '@angular/cdk/drag-drop';

const TestData: any[] = [
  {
    col1: 'col1',
    col2: 'col2',
    random: 1.123,
    negyedik: new Date(1234),
    n1: new Date(Math.random() * 5000000000000),
    n2: new Date(Math.random() * 5000000000000),
    n3: new Date(Math.random() * 5000000000000),
    n4: new Date(Math.random() * 5000000000000),
    n5: new Date(Math.random() * 5000000000000),
    n6: new Date(Math.random() * 5000000000000),
    n7: new Date(Math.random() * 5000000000000),
    n8: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123.3123,
    negyedik: new Date(Math.random() * 5000000000000),
    n1: new Date(Math.random() * 5000000000000),
    n2: new Date(Math.random() * 5000000000000),
    n3: new Date(Math.random() * 5000000000000),
    n4: new Date(Math.random() * 5000000000000),
    n5: new Date(Math.random() * 5000000000000),
    n6: new Date(Math.random() * 5000000000000),
    n7: new Date(Math.random() * 5000000000000),
    n8: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000),
    n1: new Date(Math.random() * 5000000000000),
    n2: new Date(Math.random() * 5000000000000),
    n3: new Date(Math.random() * 5000000000000),
    n4: new Date(Math.random() * 5000000000000),
    n5: new Date(Math.random() * 5000000000000),
    n6: new Date(Math.random() * 5000000000000),
    n7: new Date(Math.random() * 5000000000000),
    n8: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000),
    n1: new Date(Math.random() * 5000000000000),
    n2: new Date(Math.random() * 5000000000000),
    n3: new Date(Math.random() * 5000000000000),
    n4: new Date(Math.random() * 5000000000000),
    n5: new Date(Math.random() * 5000000000000),
    n6: new Date(Math.random() * 5000000000000),
    n7: new Date(Math.random() * 5000000000000),
    n8: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000),
    n1: new Date(Math.random() * 5000000000000),
    n2: new Date(Math.random() * 5000000000000),
    n3: new Date(Math.random() * 5000000000000),
    n4: new Date(Math.random() * 5000000000000),
    n5: new Date(Math.random() * 5000000000000),
    n6: new Date(Math.random() * 5000000000000),
    n7: new Date(Math.random() * 5000000000000),
    n8: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000),
    n1: new Date(Math.random() * 5000000000000),
    n2: new Date(Math.random() * 5000000000000),
    n3: new Date(Math.random() * 5000000000000),
    n4: new Date(Math.random() * 5000000000000),
    n5: new Date(Math.random() * 5000000000000),
    n6: new Date(Math.random() * 5000000000000),
    n7: new Date(Math.random() * 5000000000000),
    n8: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000),
    n1: new Date(Math.random() * 5000000000000),
    n2: new Date(Math.random() * 5000000000000),
    n3: new Date(Math.random() * 5000000000000),
    n4: new Date(Math.random() * 5000000000000),
    n5: new Date(Math.random() * 5000000000000),
    n6: new Date(Math.random() * 5000000000000),
    n7: new Date(Math.random() * 5000000000000),
    n8: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000),
    n1: new Date(Math.random() * 5000000000000),
    n2: new Date(Math.random() * 5000000000000),
    n3: new Date(Math.random() * 5000000000000),
    n4: new Date(Math.random() * 5000000000000),
    n5: new Date(Math.random() * 5000000000000),
    n6: new Date(Math.random() * 5000000000000),
    n7: new Date(Math.random() * 5000000000000),
    n8: new Date(Math.random() * 5000000000000)
  },

  {
    col1: 'col11',
    col2: 'col22',
    random: 123,
    negyedik: new Date(Math.random() * 5000000000000),
    n1: new Date(Math.random() * 5000000000000),
    n2: new Date(Math.random() * 5000000000000),
    n3: new Date(Math.random() * 5000000000000),
    n4: new Date(Math.random() * 5000000000000),
    n5: new Date(Math.random() * 5000000000000),
    n6: new Date(Math.random() * 5000000000000),
    n7: new Date(Math.random() * 5000000000000),
    n8: new Date(Math.random() * 5000000000000)
  },
  {
    col1: 'col1111',
    col2: 'col222',
    random: 444,
    negyedik: new Date(Math.random() * 5000000000000),
    n1: new Date(Math.random() * 5000000000000),
    n2: new Date(Math.random() * 5000000000000),
    n3: new Date(Math.random() * 5000000000000),
    n4: new Date(Math.random() * 5000000000000),
    n5: new Date(Math.random() * 5000000000000),
    n6: new Date(Math.random() * 5000000000000),
    n7: new Date(Math.random() * 5000000000000),
    n8: new Date(Math.random() * 5000000000000)
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
  @ViewChildren('checkbox', {read: ElementRef}) checkbox: QueryList<ElementRef>;
  @ViewChildren('headerColumns', {read: ElementRef}) headerColumns: QueryList<
    ElementRef
  >;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  draggedItem: number;

  // wrench icon
  wrench = faWrench;

  // column average pixel width
  private colWidthPx = 0;
  // for caching
  private refreshColWidthPx = true;

  // for mat table
  dataSource: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  // header handling
  selectionHeader = new TableHeader('select', true);
  headers: TableHeader[];
  tempHeaders: TableHeader[];
  // return the currently active headers
  get displayedColumns(): TableHeader[] {
    return this.headers.filter(h => h.active);
  }

  get columns(): string[] {
    return [this.selectionHeader.name].concat(
      this.displayedColumns.map(h => h.name)
    );
  }

  constructor() {
    this.loadHeader();

    this.dataSource = new MatTableDataSource(TestData);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private getDataHeaders(): string[] {
    // TODO load real header from request
    return Object.keys(TestData[0]);
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

  private persistHeader() {
    localStorage.setItem(
      this.tableName + '_header',
      JSON.stringify(this.headers)
    );
  }

  private loadHeader() {
    const parsedHeader: TableHeader[] = JSON.parse(
      localStorage.getItem(this.tableName + '_header')
    );

    const headers: TableHeader[] = [];

    if (parsedHeader) {
      parsedHeader.forEach(ph => {
        if (this.getDataHeaders().some(dh => dh === ph.name)) {
          headers.push(new TableHeader(ph.name, ph.active));
        }
      });
    }

    this.getDataHeaders().forEach(dh => {
      if (!headers.some(h => h.name === dh)) {
        headers.push(new TableHeader(dh, true));
      }
    });

    this.headers = headers;
    this.tempHeaders = this.headers;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // drag
  drag(header: TableHeader) {
    const index = this.headers.findIndex(h => h === header);

    if (this.draggedItem !== index) {
      moveItemInArray(this.tempHeaders, this.draggedItem, index);
      this.draggedItem = index;
    }
  }

  dragStart(header: TableHeader) {
    this.tempHeaders = [...this.headers];
    this.draggedItem = this.headers.findIndex(h => h === header);
  }

  dragEnd() {
    // remove transition css because transform is removed and it looks better if it happens instantly
    this.headers.forEach(h => {
      if (h['displacementStyle']) {
        h['displacementStyle']['transition'] = 'none';
        h['displacementStyle']['transform'] = 'none';
      }
    });
    this.headers = this.tempHeaders;
    this.persistHeader();

    // restore transition css for future animations
    setTimeout(
      () =>
        this.headers.forEach(h => {
          if (h['displacementStyle']) {
            h['displacementStyle']['transition'] = null;
          }
        }),
      100
    );
  }

  // styles
  columnStyle(column: TableHeader) {
    return {'width.px': `${this.getColWidthPx()}`};
  }

  private getColWidthPx(): number {
    // caching
    if (this.refreshColWidthPx) {
      this.colWidthPx = this.headerColumns
        ? this.headerColumns
            .map(hc => hc.nativeElement.offsetWidth)
            .reduce((h1, h2) => h1 + h2, 0) / this.headerColumns.length
        : 0;

      this.refreshColWidthPx = false;
      setTimeout(() => (this.refreshColWidthPx = true), 100);
    }

    return this.colWidthPx;
  }

  getDisplacement(column: TableHeader) {
    const multiplier =
      this.tempHeaders.findIndex(th => th === column) -
      this.headers.findIndex(h => h === column);

    return this.getColWidthPx() * multiplier;
  }

  displacementStyle(column: TableHeader) {
    if (!column['timeout'] || !column['displacementStyle']) {
      if (!column['displacementStyle']) {
        column['displacementStyle'] = {};
      }
      column['displacementStyle'][
        'transform'
      ] = `translateX(${this.getDisplacement(column)}px)`;
      column['timeout'] = true;
      setTimeout(() => (column['timeout'] = false), 110);
    }

    return column['displacementStyle'];
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
