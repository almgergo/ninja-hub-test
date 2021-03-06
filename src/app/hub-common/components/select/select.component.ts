import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Selectable} from '../../model/Selectable';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() label: string;
  @Input() items: Selectable[];

  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  selectedValue: any;

  ngOnInit() {}

  itemSelected() {
    this.selectionChange.emit(this.selectedValue);
  }
}
