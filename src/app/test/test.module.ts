import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HubCommonModule} from '../hub-common/hub-common.module';
import {TestComponent} from './test/test.component';
import {TestRoutingModule} from './test-routing.module';
import {ZXingScannerModule} from '@zxing/ngx-scanner';

@NgModule({
  declarations: [TestComponent],
  imports: [
    CommonModule,
    HubCommonModule,
    TestRoutingModule,
    ZXingScannerModule
  ],
  exports: [TestComponent]
})
export class TestModule {}
