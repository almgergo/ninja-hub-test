import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faTimes, faTrash, faUndo} from '@fortawesome/free-solid-svg-icons';
import {MatSelect} from '@angular/material';
import {shiftAnimation} from '../../animations/shift.animation';
import {appearAnimation} from '../../animations/appear.animation';

@Component({
  selector: 'app-removable-option',
  templateUrl: './removable-option.component.html',
  styleUrls: ['./removable-option.component.scss'],
  animations: [shiftAnimation, appearAnimation]
})
export class RemovableOptionComponent implements OnInit {
  @Input() value: {key: string; value: object};
  @Input() selector: MatSelect;

  @Output() valueDeleted: EventEmitter<string> = new EventEmitter();
  @Output() askConfirmation: EventEmitter<string> = new EventEmitter();

  // icons
  faTrash = faTrash;
  faLeft = faUndo;

  toDelete = false;

  constructor() {}

  ngOnInit() {}

  // region Removal with confirmation
  removeValue(event: MouseEvent) {
    // check if the removal has confirmation, if it does proceed with removing
    if (this.toDelete) {
      // delete the preset from the map
      this.valueDeleted.emit(this.value.key);
    } else {
      // if there was no confirmation, ask for it
      this.askConfirmation.emit(this.value.key);
      // shows confirmation icon
      this.toDelete = true;
      // stop the propagation of the click event to disable closing of the selector
      event.stopPropagation();
    }
  }

  private iconHolderClicked(event: MouseEvent) {
    // if the icon's holder is clicked, check if it's already asking for confirmation,
    // if yes, nothing is done
    // if no, ask for it
    if (!this.toDelete) {
      this.askConfirmation.emit(this.value.key);
      this.toDelete = true;
    }

    event.stopPropagation();
  }

  private cancelDelete($event: MouseEvent) {
    // hides confirmation icon
    this.resetPermission();
    // stop the propagation of the click event to disable closing of the selector
    event.stopPropagation();
  }

  // resets the permission for delete, if the key is not this value's key
  public resetPermission(optionKey?: string) {
    if (this.value.key !== optionKey) {
      this.toDelete = false;
    }
  }
  // endregion
}
