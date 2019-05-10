export interface Selectable {
  getValue(this): any;
  getLabel(this): string;
  isSelected(this): boolean;
}
