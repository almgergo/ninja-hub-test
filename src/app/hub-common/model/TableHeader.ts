import {Selectable} from './Selectable';

export class TableHeader implements Selectable {
  name: string;
  active: boolean;

  constructor(name: string, active: boolean) {
    this.name = name;
    this.active = active;
  }

  getLabel(): string {
    return this.name;
  }

  getValue(): any {
    return this;
  }

  isSelected(): boolean {
    return this.active;
  }
}
