import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubCommonModule} from '../hub-common/hub-common.module';
import {TestComponent} from './test/test.component';
import {TestRoutingModule} from './test-routing.module';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {QrTestComponent} from './qr-test/qr-test.component';
import {
  MatButtonModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [TestComponent, QrTestComponent],
  imports: [
    CommonModule,
    HubCommonModule,
    TestRoutingModule,
    ZXingScannerModule,
    ZXingScannerModule.forRoot(),
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [TestComponent, QrTestComponent]
})
export class TestModule {}
