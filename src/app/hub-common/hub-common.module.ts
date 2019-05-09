import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubTableComponent} from './hub-table/hub-table.component';
import {SelectComponent} from './components/select/select.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [HubTableComponent, SelectComponent],
  exports: [HubTableComponent],
  imports: [CommonModule, FormsModule, MatSelectModule]
})
export class HubCommonModule {}
