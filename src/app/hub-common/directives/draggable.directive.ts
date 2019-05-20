import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {
  draggedItem: HTMLElement;

  constructor(private elRef: ElementRef) {}

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    this.draggedItem = event.target as HTMLElement;
    console.log({drag: event.target.id});
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    // if (event.target !== this.draggedItem) {
    console.log({
      elref: this.draggedItem,
      dragover: event.target.id
    });
    // }
  }
}
