import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubTableComponent} from './components/hub-table/hub-table.component';
import {SelectComponent} from './components/select/select.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MultipleSelectComponent} from './components/multiple-select/multiple-select.component';
import {
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [SelectComponent, MultipleSelectComponent, HubTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [HubTableComponent]
})
export class HubCommonModule {}
