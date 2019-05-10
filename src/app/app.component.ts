import {Component} from '@angular/core';
import {registerLocaleData} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ninja-hub';

  constructor() {
    console.log(navigator.language);
  }
}
