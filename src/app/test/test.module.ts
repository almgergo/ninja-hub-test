import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubCommonModule} from '../hub-common/hub-common.module';
import {TestComponent} from './test/test.component';
import {TestRoutingModule} from './test-routing.module';
import {ZXingScannerModule} from '@zxing/ngx-scanner';
import {QrTestComponent} from './qr-test/qr-test.component';

@NgModule({
  declarations: [TestComponent, QrTestComponent],
  imports: [
    CommonModule,
    HubCommonModule,
    TestRoutingModule,
    ZXingScannerModule,
    ZXingScannerModule.forRoot()
  ],
  exports: [TestComponent, QrTestComponent]
})
export class TestModule {}
