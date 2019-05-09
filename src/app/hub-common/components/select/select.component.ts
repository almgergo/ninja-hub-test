import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  @Input() items: any[];
  @Input() getValue: (item: any) => any;
  @Input() getLabel: (item: any) => string;

  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  selectedValue: any;

  ngOnInit() {
    if (!this.getValue) {
      this.getValue = (item: any) => item.value;
    }
    if (!this.getLabel) {
      this.getLabel = (item: any) => item.label;
    }
  }

  itemSelected(item: any) {
    this.selectionChange.emit(this.selectedValue);
  }
}
