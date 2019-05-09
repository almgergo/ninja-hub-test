import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HubTableComponent } from './hub-table/hub-table.component';

@NgModule({
  declarations: [HubTableComponent],
  exports: [
    HubTableComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HubCommonModule {
}
