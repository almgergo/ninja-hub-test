import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Selectable} from '../../model/Selectable';

@Component({
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss']
})
export class MultipleSelectComponent implements OnInit {
  @Input() label: string;
  @Input() maxSelectionCount: number;
  @Input() items: Selectable[];
  @Input() triggerIcon: any /*IconDefinition*/;

  get filteredItems(): Selectable[] {
    return this.items.filter(
      i => !this.filter || i.getLabel().indexOf(this.filter) >= 0
    );
  }

  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  selectedValues: Selectable[];

  @ViewChild('filterInput') filterInput: ElementRef;
  filter: string;

  ngOnInit() {
    this.selectedValues = this.items.filter(i => i.isSelected());
    this.filter = '';
    this.filterInput.nativeElement.focus();
  }

  itemSelected() {
    this.selectionChange.emit(this.selectedValues);
  }

  updateFilter(text: any) {
    this.filter = text.target.value;
  }

  hideItem(item: Selectable): boolean {
    return this.filter && item.getLabel().indexOf(this.filter) < 0;
  }

  refreshSelectedValues() {
    this.selectedValues = this.items.filter(i => i.isSelected());
  }

  isItemDisabled(item: Selectable) {
    return (
      this.maxSelectionCount &&
      this.selectedValues.length >= this.maxSelectionCount &&
      !this.selectedValues.some(sv => sv === item)
    );
  }
}
