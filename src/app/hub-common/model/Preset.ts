import {TableHeader} from './TableHeader';

export class Preset {
  headers: TableHeader[];
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
    } else {
      // this.headers = [];
      this.filters = {};
      this.name = '';
    }
  }
}
