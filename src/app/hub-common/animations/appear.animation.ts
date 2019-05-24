import {animate, state, style, transition, trigger} from '@angular/animations';

export const appearAnimation = trigger('appear', [
  state(
    '*',
    style({
      opacity: 1
    })
  ),
  state(
    'void',
    style({
      opacity: 0
    })
  ),
  transition('* <=> *', animate('200ms ease-in-out'))
]);
