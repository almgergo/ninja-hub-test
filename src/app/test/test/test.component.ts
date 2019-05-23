import {Component, OnInit, ViewChild} from '@angular/core';
import {HubTableComponent} from '../../hub-common/components/hub-table/hub-table.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSelect, MatSelectChange} from '@angular/material';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

const TestData: any[] = [
  {
    type: 'Angus',
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
    type: 'Holstein',
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
    type: 'Holstein',
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
    type: 'Holstein',
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
    type: 'Holstein',
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
    type: 'Holstein',
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
    type: 'Holstein',
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
    type: 'Holstein',
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
    type: 'Holstein',
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
    type: 'Limousine',
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
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild(HubTableComponent) hubTable: HubTableComponent;
  @ViewChild('presetSelector') presetSelector: MatSelect;

  faTrash = faTrash;

  tableFilters: object = {};
  filterPresets: Map<string, object> = new Map();
  filterValues: Map<string, string[]> = new Map();
  filters: FormGroup;
  presetName: string;

  get data() {
    return TestData;
  }

  get filterNames(): string[] {
    return Object.keys(this.filters.controls);
  }

  constructor(private fb: FormBuilder) {
    this.filters = fb.group({
      random: '',
      type: ''
    });
  }

  ngOnInit(): void {
    this.restorePresets();
  }

  public resetFilters() {
    this.tableFilters = {};
    this.filters.reset();
    this.hubTable.applyFilter(this.tableFilters);
  }

  public changeFilters(filters: {key: string; value: object}) {
    this.tableFilters = {...filters.value};
    this.presetName = filters.key;
    Object.keys(filters.value).forEach(key =>
      this.filters.get(key).setValue(filters.value[key])
    );
    this.hubTable.applyFilter(this.tableFilters);
  }

  public applyFilter(columnName: string) {
    this.tableFilters[columnName] = this.filters.get(columnName).value;
    this.hubTable.applyFilter(this.tableFilters);
  }

  // save the current filter into a preset for later use
  public savePreset(name: string) {
    this.filterPresets.set(name, JSON.parse(JSON.stringify(this.tableFilters)));
    this.storePresets();
    // localStorage.setItem('test_table_filters', )
  }

  // store the presets
  private storePresets() {
    // convert the map into a list of objects and save it to localstorage
    localStorage.setItem(
      'test_table_presets',
      JSON.stringify(
        Array.from(this.filterPresets, ([key, value]) => {
          console.log({key: key, value: value});
          return {name: key, value: value};
        })
      )
    );
  }

  private restorePresets() {
    const presets: object[] = JSON.parse(
      localStorage.getItem('test_table_presets')
    );

    if (presets) {
      presets.forEach((preset: {name: string; value: object}) =>
        this.filterPresets.set(preset.name, preset.value)
      );
    }
  }

  // create unique list of values for specific filter and cache it inside a map
  createFilterValues(dataSourceElement: any[], columnName: string): string[] {
    if (!this.filterValues.get(columnName)) {
      this.filterValues.set(
        columnName,
        dataSourceElement
          .map(row => row[columnName])
          .filter((value, index, self) => self.indexOf(value) === index)
      );
    }

    return this.filterValues.get(columnName);
  }

  // select a preset filter
  selectPresetFilter(event: MatSelectChange) {
    if (event.value) {
      this.changeFilters(event.value);
    } else {
      this.resetFilters();
    }
  }

  removePreset(presetName: string) {
    this.resetFilters();
    this.filterPresets.delete(presetName);
    if (this.filterPresets.size <= 0) {
      this.presetSelector.close();
    }
  }
}
