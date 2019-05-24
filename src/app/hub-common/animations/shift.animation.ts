import {animate, state, style, transition, trigger} from '@angular/animations';

export const shiftAnimation = trigger('shift', [
  state(
    'true',
    style({
      transform: 'translateX({{shift}})'
    }),
    {params: {shift: '0'}}
  ),
  state(
    'false',
    style({
      transform: 'none'
    })
  ),

  transition('false => true', animate('300ms ease-in-out')),
  transition(':enter', animate('300ms ease-in-out')),
  transition('true => false', animate('300ms ease-in-out'))
]);
