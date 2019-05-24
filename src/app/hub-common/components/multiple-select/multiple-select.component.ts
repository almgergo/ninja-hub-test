import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Selectable} from '../../model/Selectable';
import {MatSelect, MatTooltip} from '@angular/material';
import {ScrollDispatcher} from '@angular/cdk/overlay';

@Component({
  selector: 'app-multiple-select',
  templateUrl: './multiple-select.component.html',
  styleUrls: ['./multiple-select.component.scss']
})
export class MultipleSelectComponent implements OnInit {
  @ViewChild(MatSelect) matSelect: MatSelect;
  @ViewChildren('tooltip') tooltips: QueryList<MatTooltip>;

  private _items: Selectable[];
  get items(): Selectable[] {
    return this._items;
  }

  @Input() set items(value: Selectable[]) {
    this._items = value;
    this.refreshSelectedValues();
  }

  @Input() label: string;
  @Input() maxSelectionCount: number;
  @Input() triggerIcon: any /*IconDefinition*/;

  constructor(private scroll: ScrollDispatcher) {
    scroll.scrolled(1).subscribe(console.log);
  }

  @Output() selectionChange: EventEmitter<any> = new EventEmitter();

  selectedValues: Selectable[];

  @ViewChild('filterInput') filterInput: ElementRef;
  filter: string;

  ngOnInit() {
    this.selectedValues = this._items.filter(i => i.isSelected());
    this.filter = '';
    this.filterInput.nativeElement.focus();
    this.matSelect._openedStream.subscribe(() =>
      this.registerPanelScrollEvent()
    );
  }

  registerPanelScrollEvent() {
    const panel = this.matSelect.panel.nativeElement;
    panel.addEventListener('scroll', event => this.hideTooltipsOnScroll(event));
  }

  hideTooltipsOnScroll(event) {
    this.tooltips.forEach(t => t.hide());
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
    this.selectedValues = this._items.filter(i => i.isSelected());
  }

  isItemDisabled(item: Selectable) {
    return (
      this.maxSelectionCount &&
      this.selectedValues.length >= this.maxSelectionCount &&
      !this.selectedValues.some(sv => sv === item)
    );
  }
}
