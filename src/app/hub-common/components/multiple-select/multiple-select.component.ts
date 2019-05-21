import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
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
    console.log(this.filter);
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
}
