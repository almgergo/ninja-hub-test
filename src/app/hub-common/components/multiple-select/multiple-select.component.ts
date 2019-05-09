import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Selectable} from '../../model/Selectable';

@Component({
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss']
})
export class MultipleSelectComponent implements OnInit {
  @Input() label: string;
  @Input() items: Selectable[];

  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  selectedValues: Selectable[];

  ngOnInit() {}

  itemSelected() {
    this.selectionChange.emit(this.selectedValues);
  }
}
