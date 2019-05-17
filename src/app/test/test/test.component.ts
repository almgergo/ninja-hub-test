import {Component} from '@angular/core';

declare const qrcode: any;

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
  qrResult: string;

  constructor() {}

  onFileChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      // console.log(e.target.result);
      const data = e.target.result;
      qrcode.callback = res => {
        console.log(res);
        this.qrResult = res;
      };
      qrcode.decode(data);
    };
  }
}
