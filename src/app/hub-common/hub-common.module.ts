import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubTableComponent} from './components/hub-table/hub-table.component';
import {SelectComponent} from './components/select/select.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MultipleSelectComponent} from './components/multiple-select/multiple-select.component';
import {
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {TranslateModule} from '@ngx-translate/core';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {RemovableOptionComponent} from './components/removable-option/removable-option.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DatepickerComponent} from './components/datepicker/datepicker.component';

@NgModule({
  declarations: [
    SelectComponent,
    MultipleSelectComponent,
    HubTableComponent,
    RemovableOptionComponent,
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatSelectModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DragDropModule,
    MatTooltipModule,
    MatSnackBarModule,
    TranslateModule,
    ScrollingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  exports: [HubTableComponent, RemovableOptionComponent, DatepickerComponent],
  providers: [MatDatepickerModule]
})
export class HubCommonModule {}
