import {
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {HubTableComponent} from '../../hub-common/components/hub-table/hub-table.component';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSelect, MatSelectChange} from '@angular/material';
import {shiftAnimation} from '../../hub-common/animations/shift.animation';
import {appearAnimation} from '../../hub-common/animations/appear.animation';
import {RemovableOptionComponent} from '../../hub-common/components/removable-option/removable-option.component';
import {Preset} from '../../hub-common/model/Preset';
import {KeyValue} from '@angular/common';
import {TestData2} from '../data/test.data';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  animations: [shiftAnimation, appearAnimation]
})
export class TestComponent implements OnInit {
  @ViewChild(HubTableComponent) hubTable: HubTableComponent;
  @ViewChild('presetSelector') presetSelector: MatSelect;
  @ViewChildren('removableOptions') removableOptions: QueryList<
    RemovableOptionComponent
  >;

  tableFilters: Preset = new Preset();
  selectedPreset: KeyValue<string, Preset>;

  filterPresets: Map<string, Preset> = new Map();
  filterValues: Map<string, string[]> = new Map();
  filtersFormGroup: FormGroup;

  get data() {
    return TestData2;
  }

  get filterNames(): string[] {
    return Object.keys(this.filtersFormGroup.controls);
  }

  // region Init
  constructor(private fb: FormBuilder) {
    this.filtersFormGroup = fb.group({
      Fajta: '',
      Szin: '',
      Neme: ''
    });
  }

  ngOnInit(): void {
    this.restorePresets();
  }

  // create unique list of values for specific filter and cache it inside a map
  createFilterValues(dataSourceElement: any[], columnName: string): string[] {
    if (!this.filterValues.get(columnName)) {
      // cache the filter values
      this.filterValues.set(
        columnName,
        dataSourceElement
          .map(row => row[columnName])
          .filter((value, index, self) => self.indexOf(value) === index)
      );
    }

    return this.filterValues.get(columnName);
  }
  // endregion

  // region Modify filters
  public resetFilters() {
    // reset the formGroup
    this.filtersFormGroup.reset();
    // reset the filtersFormGroup object to a new object
    this.tableFilters = new Preset();
    // apply the new now reset filtersFormGroup to the table
    this.hubTable.applyFilter(this.tableFilters);
  }

  public changeFilters() {
    // reset form in case not every filter is used
    this.filtersFormGroup.reset();
    // apply the filter
    this.tableFilters = new Preset(this.selectedPreset.value);

    // copy the values into the formGroup
    Object.keys(this.tableFilters.filters).forEach(key =>
      this.filtersFormGroup.get(key).setValue(this.tableFilters.filters[key])
    );

    // apply the filter to the table
    this.hubTable.applyFilter(this.tableFilters);
  }

  public applyFilter(columnName: string) {
    // set the chosen filter
    this.tableFilters.filters[columnName] = this.filtersFormGroup.get(
      columnName
    ).value;
    // apply the filter to the table
    this.hubTable.applyFilter(this.tableFilters);
  }
  // endregion

  // region Save, select, store and restore presets
  // select a preset filter
  private usePreset(event: MatSelectChange) {
    if (event.value) {
      // if a preset is chosen, apply it
      this.changeFilters();
    } else {
      // else reset the filtersFormGroup
      this.resetFilters();
    }
  }

  // save the current filter into a preset for later use
  public savePreset() {
    const copiedPreset: Preset = JSON.parse(JSON.stringify(this.tableFilters));
    copiedPreset.headers = JSON.parse(JSON.stringify(this.hubTable.headers));
    // copiedPreset.sort = this.hubTable.sort.;
    copiedPreset.pageSize = this.hubTable.paginator.pageSize;
    copiedPreset.sort = {
      direction: this.hubTable.sort.direction,
      active: this.hubTable.sort.active
    };

    // save the filter into presets
    this.filterPresets.set(this.tableFilters.name, copiedPreset);
    // store the presets
    this.storePresets();
  }

  // store the presets
  private storePresets() {
    // convert the map into a list of objects and save it to localstorage
    localStorage.setItem(
      'test_table_presets',
      JSON.stringify(
        Array.from(this.filterPresets, ([key, value]) => {
          return {name: key, value: value};
        })
      )
    );
  }

  private restorePresets() {
    // load serialized map from localstorage
    const presets: object[] = JSON.parse(
      localStorage.getItem('test_table_presets')
    );

    // fill presets map from serialized object
    if (presets) {
      presets.forEach((preset: {name: string; value: Preset}) =>
        this.filterPresets.set(preset.name, preset.value)
      );
    }
  }

  // endregion

  presetDeleteConfirmationRequested(optionKey: string) {
    this.removableOptions.forEach(ro => ro.resetPermission(optionKey));
  }

  deletePreset(presetKey: string) {
    this.filterPresets.delete(presetKey);
    this.storePresets();
  }

  presetSelectorOpened() {
    this.removableOptions.forEach(ro => ro.resetPermission());
  }
}
