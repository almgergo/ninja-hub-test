import {TableHeader} from './TableHeader';
import {SortDirection} from '@angular/material';

export class Preset {
  headers: TableHeader[];
  pageSize: number;
  sort: {active: string; direction: SortDirection};
  filters: object;
  name: string;

  constructor(other?: Preset) {
    if (other) {
      if (other.filters) {
        this.filters = {...other.filters};
      }
      if (other.headers) {
        this.headers = [...other.headers];
      }
      if (other.name) {
        this.name = other.name;
      }
      if (other.sort) {
        this.sort = other.sort;
      }
      if (other.pageSize) {
        this.pageSize = other.pageSize;
      }
    } else {
      // this.headers = [];
      this.filters = {};
      this.name = '';
      this.pageSize = 10;
    }
  }
}
