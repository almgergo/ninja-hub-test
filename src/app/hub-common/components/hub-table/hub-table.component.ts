import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {TableHeader} from '../../model/TableHeader';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {faGripHorizontal, faWrench} from '@fortawesome/free-solid-svg-icons';
import {moveItemInArray} from '@angular/cdk/drag-drop';
import {MultipleSelectComponent} from '../multiple-select/multiple-select.component';
import {Preset} from '../../model/Preset';

@Component({
  selector: 'app-hub-table',
  templateUrl: './hub-table.component.html',
  styleUrls: ['./hub-table.component.scss']
})
export class HubTableComponent implements OnInit, AfterViewInit {
  // return the currently active headers
  get displayedColumns(): TableHeader[] {
    return this.headers.filter(h => h.active);
  }

  get columns(): string[] {
    return [this.selectionHeader.name].concat(
      this.displayedColumns.map(h => h.name)
    );
  }

  // cache window width to only react to window.resize events modifying it
  windowWidth: number;

  // holds template for table gadgets
  @ContentChild(TemplateRef) gadgetsTemplate: TemplateRef<any>;

  @Input() tableName: string;
  @Input() data: object[];

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
  grip = faGripHorizontal;

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

  // region Initialization
  constructor() {}

  // return the list of column names
  private getDataHeaders(): string[] {
    // TODO load real header from request
    return Object.keys(this.data[0]);
  }

  ngOnInit() {
    this.loadHeader();
    this.initDatasource();
    this.windowWidth = window.innerWidth;
    this.setCustomFilterPredicate();
  }

  private initDatasource(): void {
    this.dataSource = new MatTableDataSource(this.data);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkTableBounds(), 10);
  }

  // endregion

  // region Table bounds handling
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
  // endregion

  // region Checkbox and column selection handling
  // handle column selection in multiple select
  columnsSelected(headers: TableHeader[]) {
    // if a column is selected, we need to refresh which ones are active
    this.headers.forEach(
      h =>
        (h.active = headers.some(
          selectedHeader => selectedHeader.name === h.name
        ))
    );

    // FIXME? reset maxColumnCount? if a wider column is removed, maybe 2 fit in its place, is it ok like this or should it be implemented?
    // check if the new number of columns still fit inside the table
    setTimeout(() => this.checkTableBounds(), 10);
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
  // endregion

  // region Persistence
  // save the header to local store
  private persistHeader() {
    localStorage.setItem(
      this.tableName + '_header',
      JSON.stringify(this.headers)
    );
  }

  // restore the header from local store
  public loadHeader(presetHeader?: TableHeader[]) {
    let storedHeader: TableHeader[];
    if (presetHeader) {
      // if there are preset headers, use them
      storedHeader = presetHeader;
    } else {
      // else load headers from local store
      storedHeader = JSON.parse(
        localStorage.getItem(this.tableName + '_header')
      );
    }

    const headers: TableHeader[] = [];
    // put columns that are stored first, in the order they were stored
    if (storedHeader) {
      storedHeader.forEach(ph => {
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
  // endregion

  // region Filtering
  private setCustomFilterPredicate() {
    // set custom filter predicate for data source
    this.dataSource.filterPredicate = (data: any, filtersJson: string) => {
      const matchFilter = [];
      const filters: object = JSON.parse(filtersJson);

      Object.keys(filters).forEach(key => {
        const val = data[key] === null ? '' : data[key];
        matchFilter.push(
          `${val}`.toLowerCase().includes(`${filters[key]}`.toLowerCase())
        );
      });
      return matchFilter.every(Boolean);
    };
  }

  public applyFilter(preset: Preset) {
    this.dataSource.filter = JSON.stringify(preset.filters);
    this.loadHeader(preset.headers);

    if (preset.pageSize) {
      this.dataSource.paginator.pageSize = preset.pageSize;
    }

    if (preset.sort) {
      this.dataSource.sort.sort({id: null, start: 'asc', disableClear: false});
      this.dataSource.sort.sort({
        id: preset.sort.active,
        start: <'asc' | 'desc'>preset.sort.direction,
        disableClear: false
      });
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // endregion

  // region Drag handling
  // dragEnter
  dragEnter(header: TableHeader, name: string) {
    console.log({dragEnter: this.draggedItem, name: name});
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

    console.log({draggedItem: this.draggedItem});
  }

  dragEnd() {
    // remove transition css because transform is removed and it looks better if it happens instantly
    this.headers.forEach(h => {
      if (h['displacementStyle']) {
        h['displacementStyle']['transition'] = 'none';
        h['displacementStyle']['transform'] = 'none';
      }
    });

    console.log({dragEnd: this.draggedItem});

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
  // endregion

  // region Column width and translate for animation
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
  // endregion

  // region Element type checks
  isNumber(element: any) {
    return typeof element === 'number';
  }

  isDate(element: any) {
    return element && typeof element.getMonth === 'function';
  }

  isString(element: any) {
    return typeof element === 'string';
  }
  // endregion
}
