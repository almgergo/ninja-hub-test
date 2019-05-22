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
  MatIconModule,
  MatTooltipModule,
  MatSnackBarModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {DraggableDirective} from './directives/draggable.directive';
import {TranslateModule} from '@ngx-translate/core';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    SelectComponent,
    MultipleSelectComponent,
    HubTableComponent,
    DraggableDirective
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
    ScrollingModule
  ],
  exports: [HubTableComponent]
})
export class HubCommonModule {}
