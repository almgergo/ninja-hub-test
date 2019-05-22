import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
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
import {MultipleSelectComponent} from '../multiple-select/multiple-select.component';

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
export class HubTableComponent implements OnInit, AfterViewInit {
  // cache window width to only react to window.resize events modifying it
  windowWidth: number;

  @Input() tableName: string;

  @ViewChild('tableContainer') tableContainer: ElementRef;
  @ViewChild('table', {read: ElementRef}) table: ElementRef;
  @ViewChild('header', {read: ElementRef}) header: ElementRef;
  @ViewChildren('checkbox', {read: ElementRef}) checkbox: QueryList<ElementRef>;
  @ViewChildren('headerColumns', {read: ElementRef}) headerColumns: QueryList<
    ElementRef
  >;
  @ViewChild(MultipleSelectComponent) columnSelector: MultipleSelectComponent;
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
  maxColumnCount: number; // track how many columns fit on screen
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
    this.windowWidth = window.innerWidth;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkTableBounds(), 10);
  }

  // recursively deactivate the last column as long as the table is large than its container
  checkTableBounds() {
    // if the table is larger than its container
    if (
      this.table.nativeElement.offsetWidth >
      this.tableContainer.nativeElement.offsetWidth
    ) {
      // deactivate the last column
      for (let i = this.headers.length - 1; i >= 0; i--) {
        if (this.headers[i].active) {
          this.headers[i].active = false;
          break;
        }
      }

      // if the table fits, record the max column count that fits
      this.maxColumnCount = this.headers.filter(h => h.active).length;
      // wait for it to take effect, then do it again as long as needed
      setTimeout(() => this.checkTableBounds(), 5);
    } else {
      // refresh selected values in multiple select to represent current selection
      this.columnSelector.refreshSelectedValues();
      // header selection could have  changed, so save it
      this.persistHeader();
    }
  }

  // when the window size changes we need to reevaluate what fits inside the table
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // trigger only when the window's width changes
    if (this.windowWidth !== window.innerWidth) {
      this.windowWidth = window.innerWidth;
      // remove the limitation on column counts because it will be reduced in checkTableBounds later if needed
      this.maxColumnCount = this.headers.length;
      // limit the number of columns allowed if necessary
      setTimeout(() => this.checkTableBounds(), 5);
    }
  }

  // return the list of column names
  private getDataHeaders(): string[] {
    // TODO load real header from request
    return Object.keys(TestData[0]);
  }

  columnsSelected(headers: TableHeader[]) {
    // if a column is selected, we need to refresh which ones are active
    this.headers.forEach(
      h =>
        (h.active = headers.some(
          selectedHeader => selectedHeader.name === h.name
        ))
    );

    // FIXME? reset maxColumnCount? if a larger column is removed, maybe 2 fit in its place, is it ok like this or should be implemented?
    // check if the new number of columns still fit inside the table
    setTimeout(() => this.checkTableBounds(), 5);
  }

  // Whether the number of selected elements matches the total number of rows.
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  // Selects all rows if they are not all selected; otherwise clear selection.
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // The label for the checkbox on the passed row
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  // save the header to local store
  private persistHeader() {
    localStorage.setItem(
      this.tableName + '_header',
      JSON.stringify(this.headers)
    );
  }

  // restore the header from local store
  private loadHeader() {
    // load header from local store
    const parsedHeader: TableHeader[] = JSON.parse(
      localStorage.getItem(this.tableName + '_header')
    );

    const headers: TableHeader[] = [];
    // put columns that are stored first, in the order they were stored
    if (parsedHeader) {
      parsedHeader.forEach(ph => {
        if (this.getDataHeaders().some(dh => dh === ph.name)) {
          headers.push(new TableHeader(ph.name, ph.active));
        }
      });
    }

    // load rest of the columns from request, in case there are new ones or no stored header
    this.getDataHeaders().forEach(dh => {
      if (!headers.some(h => h.name === dh)) {
        headers.push(new TableHeader(dh, true));
      }
    });

    this.maxColumnCount = headers.length;
    this.headers = headers;
    this.tempHeaders = this.headers;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // dragEnter
  dragEnter(header: TableHeader) {
    // find the index of the element that we've just dragged something over
    const index = this.headers.findIndex(h => h === header);

    // if it's not the same item that's being dragged right now, then move the dragged item in front of it
    if (this.draggedItem !== index) {
      moveItemInArray(this.tempHeaders, this.draggedItem, index);
      this.draggedItem = index;
    }
  }

  dragStart(header: TableHeader) {
    // reset the tempHeaders that will contain the current virtual position of columns (as they are displayed, with transform: translateX)
    this.tempHeaders = [...this.headers];
    // store the item being dragged
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

    // set the headers to represent the new order
    this.headers = this.tempHeaders;

    // restore transition css for future animations
    setTimeout(
      () =>
        this.headers.forEach(h => {
          if (h['displacementStyle']) {
            h['displacementStyle']['transition'] = null;
          }

          // save the headers
          this.persistHeader();
        }),
      100
    );
  }

  columnStyle(column: TableHeader) {
    // set the width of the column
    return {'width.px': `${this.getColWidthPx()}`};
  }

  // average width of the columns
  private getColWidthPx(): number {
    // cache the value for performance
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
